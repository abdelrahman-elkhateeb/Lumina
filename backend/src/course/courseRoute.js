const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

// crud for course
router.get("/", courseController.getCourses);
router.route("/:id/preview")
  .get(courseController.getCourse);

router.use(authController.protect);

router.post("/createCourse", authController.restrictTo("instructor"), courseController.createCourse);

router.route("/:id/learn")
  .get(courseController.getCourse).patch(authController.restrictTo("instructor"), courseController.updateCourse)
  .delete(authController.restrictTo("instructor"), courseController.deleteCourse);


// crud for section
router.get("/getSections", authController.restrictTo("instructor"), courseController.getSections);
router.post("/createSection", authController.restrictTo("instructor"), courseController.createSection);
router
  .route("/:courseId/sections/:sectionId")
  .get(authController.restrictTo("instructor"), courseController.getSection)
  .patch(authController.restrictTo("instructor"), courseController.updateSection)
  .delete(authController.restrictTo("instructor"), courseController.deleteSection);

// crud for lesson
router.post("/createLesson", authController.restrictTo("instructor"), courseController.createLesson);

module.exports = router;