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
router.get("/manage", courseController.displayInstructorCourses);

router.post("/create", authController.restrictTo("instructor"), courseController.createCourse);
router.post("/placementTest/create", authController.restrictTo("instructor", courseController.createCoursePlacementTest))

router.route("/:id")
  .get(courseController.getCourse)
  .patch(authController.restrictTo("instructor"), courseController.updateCourse)
  .delete(authController.restrictTo("instructor"), courseController.deleteCourse);

// crud for section
router.get("/getSections", authController.restrictTo("instructor"), courseController.getSections);
router.post("/section/create", authController.restrictTo("instructor"), courseController.createSection);
router
  .route("/:courseId/sections/:sectionId")
  .get(authController.restrictTo("instructor"), courseController.getSection)
  .patch(authController.restrictTo("instructor"), courseController.updateSection)
  .delete(authController.restrictTo("instructor"), courseController.deleteSection);

// crud for lesson
router.post("/lesson/create", authController.restrictTo("instructor"), courseController.createLesson).patch("/:courseId/lessons/:lessonId", authController.restrictTo("instructor"), courseController.updateLesson);

module.exports = router;