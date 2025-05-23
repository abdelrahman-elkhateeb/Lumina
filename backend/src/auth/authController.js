require('dotenv').config();
const User = require('../users/userModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { promisify } = require('util');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const admin = require("firebase-admin");
const serviceAccount = require("../services/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

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

exports.googleLogin = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  if (!token) return next(new AppError("No Google token provided", 400));

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { email, name } = decodedToken;

    if (!email || !name) {
      return next(new AppError("Token missing required user information", 400));
    }

    let user = await User.findOne({ email });

    const randomPassword = crypto.randomBytes(20).toString("hex");

    if (!user) {
      user = await User.create({
        name,
        email,
        password: randomPassword,
        passwordConfirm: randomPassword,
        userType: "student",
        gender: "male",
      });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    console.error("Google/Firebase authentication error:", error);
    return next(new AppError("Google authentication failed", 401));
  }
});

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
  // 1️) Get the token from Authorization header or Cookies
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract from Authorization header
  } else if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  // 2️) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3️) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("The user belonging to this token no longer exists.", 401));
  }

  // 4️) Check if user changed password after token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! Please log in again.", 401));
  }

  // 5️) Grant Access
  req.user = freshUser; // Attach user to request
  next();
});

exports.restrictTo = (...userType) => {
  return (req, res, next) => {
    // 1) getting the user role as an array
    if (!userType.includes(req.user.userType)) {
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
});

exports.logout = catchAsync(async (req, res, next) => {

  const cookieOptions = {
    httpOnly: true,
  }
  if (process.env.NODE_ENV == "production") cookieOptions.secure = true;

  res.clearCookie("jwt", cookieOptions);

  return res.status(200).json({ message: "Logout successful" });
});
