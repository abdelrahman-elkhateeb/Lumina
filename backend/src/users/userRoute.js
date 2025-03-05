const express = require('express');
const userController = require("../users/userController");
const authController = require('../auth/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post("/logout", authController.logout);

//protected routes (authentication)
// Apply protect middleware to all routes below
router.use(authController.protect);

router
  .route('/')
  .get(userController.getAllUsers)

router.route("/user").get(userController.getUser);

module.exports = router;