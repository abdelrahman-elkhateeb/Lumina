const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

// crud for course
router.get("/", authController.protect, authController.restrictTo("instructor"), courseController.getCourses);
router.post("/createCourse", authController.protect, authController.restrictTo("instructor"), courseController.createCourse);

router.route("/:id")
  .get(authController.protect, authController.restrictTo("instructor"), courseController.getCourse)
  .patch(authController.protect, authController.restrictTo("instructor"), courseController.updateCourse)
  .delete(authController.protect, authController.restrictTo("instructor"), courseController.deleteCourse);

// crud for section
router.get("/getSections", authController.protect, authController.restrictTo("instructor"), courseController.getSections);
router.post("/createSection", authController.protect, authController.restrictTo("instructor"), courseController.createSection);

router.route("section/:id")
  .get(authController.protect, authController.restrictTo("instructor"), courseController.getSection)

// crud for lesson
router.post("/createLesson", authController.protect, authController.restrictTo("instructor"), courseController.createLesson);

module.exports = router;