const User = require("./userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  })
});

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  //1) check if name or email is provided
  if (!name && !email) {
    return next(new AppError('Please provide either name or email', 400));
  }

  //2) filter allowd fileds only
  const updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;

  //3) update user data
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  if (!updatedUser) {
    return next(new AppError('User not found.', 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedUser
    }
  })
});