// utils/jwt.js
const jwt = require('jsonwebtoken');

// Generate a token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
};

// verify a token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
};

module.exports = { generateToken, verifyToken };