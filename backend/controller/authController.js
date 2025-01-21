const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    userType: req.body.userType
  });
  res.status(201).json({ status: "success", data: newUser })
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

  res.status(200).json({
    status: 'success',
  });
});