const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

router.post("/createCourse", authController.protect, authController.restrictTo("instructor"), courseController.createCourse);

router.post("/createSection", authController.protect, authController.restrictTo("instructor"), courseController.createSection);

router.post("/createLesson", authController.protect, authController.restrictTo("instructor"), courseController.createLesson);

module.exports = router;