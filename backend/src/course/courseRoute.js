const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

router.get("/", authController.protect, courseController.getCourses);

router.get("/getSections", authController.protect, courseController.getSections);

router.post("/createCourse", authController.protect, courseController.createCourse);

router.post("/createSection", authController.protect, courseController.createSection);

router.post("/createLesson", authController.protect, authController.restrictTo("instructor"), courseController.createLesson);

module.exports = router;