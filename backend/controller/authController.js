const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),// 1 day
    httpOnly: true,
  }

  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  })
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check the email and the pass
  if (!email || !password) return next(new AppError("please provide email and password", 400));

  // 2) check if the email and password is correct and user exist
  const user = await User.findOne({ email }).select("+password");

  if (!(await user.correctPassword(password, user.password))) return next(new AppError("incorrect email or password", 401));

  // 3) if every thing is ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access", 401));
  }

  // 2) verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) check if the user is still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('the user belong to the token is no longer exist.',
      401));
  }

  // 4) check if the user changed password after the token was issued
  if (await freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // if every thing is ok, store user in the request object
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // 1) getting the user role as an array
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  })

  // 2) if the token has not expired, and there is a user, set the new password

  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3) update changedPasswordAt property for the current user
  user.changedPasswordAfter = Date.now();
  await user.save({ validateBeforeSave: false });

  // 4) log the user in, send JWT token
  createSendToken(user, 200, res);
})