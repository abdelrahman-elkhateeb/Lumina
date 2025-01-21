const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true,"please provide a unique email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a valid password"],
    minLength: [8, "password must be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords don't match",
    },
  },
  userType: {
    type: String,
    required: true,
    enum: ["student", "instructor"],
    message: "Invalid user type",
  },
});

userSchema.pre("save", async function (next) {
  //only run this function if password modified
  if (!this.isModified("password")) return next();

  //hash the password
  this.password = await bcrypt.hash(this.password, 12);

  //delete password field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
