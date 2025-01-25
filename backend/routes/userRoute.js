const express = require('express');
const userController = require("../controller/userController");
const authController = require('../controller/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//protected routes (authentication)
// Apply protect middleware to all routes below
router.use(authController.protect);

router
  .route('/')
  .get(userController.getAllUsers)

router.route("/:id").get(userController.getUser);

module.exports = router;