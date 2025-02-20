const express = require("express");
const authController = require('../controller/authController');
const courseController = require("../controller/courseController");

const router = express.Router();

router.post("/createCourse", authController.protect, courseController.createCourse);

router.get("/getCourses", authController.protect, courseController.getCourses);

router.get("/getCourse/:id", authController.protect, courseController.getCourse);

router.patch("/updateCourse/:id", authController.protect, courseController.updateCourse);

router.delete("/deleteCourse/:id", authController.protect, courseController.deleteCourse);

module.exports = router;