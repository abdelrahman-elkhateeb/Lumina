const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

// crud for course
router.get("/", authController.protect, authController.restrictTo("instructor"), courseController.getCourses);
router.get("/getCourse/:id", authController.protect, authController.restrictTo("instructor"), courseController.getCourse);
router.post("/createCourse", authController.protect, authController.restrictTo("instructor"), courseController.createCourse);

// crud for section
router.get("/getSections", authController.protect, authController.restrictTo("instructor"), courseController.getSections);
router.post("/createSection", authController.protect, authController.restrictTo("instructor"), courseController.createSection);

// crud for lesson
router.post("/createLesson", authController.protect, authController.restrictTo("instructor"), courseController.createLesson);

module.exports = router;