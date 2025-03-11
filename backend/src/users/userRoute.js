const express = require('express');
const userController = require("../users/userController");
const authController = require('../auth/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post("/logout", authController.logout);

//protected routes (authentication)
router.get('/', authController.protect, userController.getAllUsers);

router.get('/user', authController.protect, userController.getUser);

router.patch('/updateUser', authController.protect, userController.updateUserProfile);

module.exports = router;