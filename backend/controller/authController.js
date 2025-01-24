const User = require('../models/userModel');
const { generateToken, verifyToken } = require('../utils/jwt');
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
  const token = generateToken(newUser._id);
  res.status(201).json({ status: "success", token })
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
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify the token
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }

  // 3) Check if the user still exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Grant access to the protected route
  req.user = currentUser; // Attach the user to the request object
  next();
});