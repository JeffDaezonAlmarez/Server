const express = require('express');
const router = express.Router();

const UserController = require('../controllers/Users.controllers');
const verifyToken = require('../controllers/Verify.token');

router.post('/user/register', UserController.addUser);

router.post('/user/login', UserController.userLogin);

router.get('/user/info/:_id', UserController.getUserInfo);

router.get('/users', UserController.getUsers);

module.exports = router;
