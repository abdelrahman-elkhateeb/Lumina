const express = require('express');
const userController = require("../users/userController");
const authController = require('../auth/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post("/logout", authController.logout);
router.post("/googleLogin", authController.googleLogin);

//protected routes (authentication)
router.use(authController.protect);
router.get('/', userController.getAllUsers);

router.get('/user', userController.getUser);

router.patch('/updateUser', userController.updateUserProfile);

module.exports = router;