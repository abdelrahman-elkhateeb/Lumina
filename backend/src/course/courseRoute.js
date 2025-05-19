const express = require("express");
const authController = require('../auth/authController');
const courseController = require("./course.controller");

const router = express.Router();

// crud without protection
router.get("/preview/:id", courseController.previewCourse);
router.get("/preview", courseController.featuredCourses);

// crud for course with protection
router.use(authController.protect);
router.get("/", authController.restrictTo("admin"), courseController.getCourses);
router.get("/myCourses", courseController.getMyCourses);
router.post("/purchase-course", courseController.purchaseCourses);
router.get("/manage", courseController.displayInstructorCourses);

router.post("/create", authController.restrictTo("instructor", "admin"), courseController.createCourse);
router.patch(
  "/create-placementTest",
  authController.restrictTo("instructor"),
  courseController.createCoursePlacementTest
);

router.get("/get-placementTest/:courseId", courseController.getPlacementTest);

router.route("/:id")
  .get(courseController.getCourse)
  .patch(authController.restrictTo("instructor", "admin"), courseController.updateCourse)
  .delete(authController.restrictTo("admin"), courseController.deleteCourse);

// crud for section
router.get("/getSections", authController.restrictTo("instructor", "admin"), courseController.getSections);
router.post("/section/create", authController.restrictTo("instructor"), courseController.createSection);
router
  .route("/:courseId/sections/:sectionId")
  .get(authController.restrictTo("instructor"), courseController.getSection)
  .patch(authController.restrictTo("instructor", "admin"), courseController.updateSection)
  .delete(authController.restrictTo("admin"), courseController.deleteSection);

// crud for lesson
router.post("/lesson/create", authController.restrictTo("instructor"), courseController.createLesson).patch("/:courseId/lessons/:lessonId", authController.restrictTo("instructor", "admin"), courseController.updateLesson);

module.exports = router;