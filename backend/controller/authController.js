const User = require('../models/userModel');
const { generateToken, verifyToken } = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    userType: req.body.userType,
    gender: req.body.gender,
  });
  const token = generateToken(newUser._id);
  res.status(201).json({
    status: "success", token,
    token: token,
    userData: newUser
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if password is correct and the user exist
  const user = await User.findOne({ email }).select('+password');

  if (!(await user.correctPassword(password, user.password)) || !user)
    return next(new AppError('Incorrect email or password', 401));
  // generate token
  const token = generateToken(user._id);
  res.status(200).json({
    status: 'success',
    token: token,
    userData: user
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify the token - if it's valid, we can continue
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists - if not, there is nothing we can
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 4) check if the password changed after the token was issued
  if (freshUser.changedPasswordAt(decoded.iat)) {
    return next(new AppError('You are not logged in! Please log in to get access.',
      401));
  }

  //GRANT ACCESS TO THE USER
  req.user = freshUser;
  next();
});