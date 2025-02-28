const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

router.post("/createCourse", authController.protect, authController.restrictTo("instructor"), courseController.createCourse);

module.exports = router;