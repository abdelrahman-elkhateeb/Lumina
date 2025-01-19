const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.createUser = async (req, res) => {
  const { name, email, password, passwordConfirm, userType } = req.body;

  // Validate input fields
  if (!name || !email || !password || !passwordConfirm || !userType) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required.",
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match.",
    });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already registered.",
      });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm, // This will be removed in the `pre('save')` middleware
      userType,
    });

    // Send response with sanitized user data
    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred while creating the user.",
      error: err.message,
    });
  }
};