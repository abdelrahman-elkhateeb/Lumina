const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

// crud without protection
router.get("/preview/:id", courseController.previewCourse);
router.get("/preview", courseController.featuredCourses);

// crud for course with protection
router.use(authController.protect);
router.get("/myCourses", courseController.getMyCourses);
router.post("/pruchaseCourse", courseController.purchaseCourse);
router.get("/instructorCourses", courseController.displayInstructorCourses);

router.post("/createCourse", authController.restrictTo("instructor"), courseController.createCourse);

router.route("/:id")
  .get(courseController.getCourse)
  .patch(authController.restrictTo("instructor"), courseController.updateCourse)
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
router.post("/createLesson", authController.restrictTo("instructor"), courseController.createLesson).patch("/:courseId/lessons/:lessonId", authController.restrictTo("instructor"), courseController.updateLesson);

module.exports = router;