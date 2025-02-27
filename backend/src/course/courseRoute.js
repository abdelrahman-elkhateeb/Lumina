const express = require("express");
const authController = require('../controller/authController');
const courseController = require("./courseController");

const router = express.Router();

router.post("/createCourse", authController.protect, courseController.createCourse);


module.exports = router;