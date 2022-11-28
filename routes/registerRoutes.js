const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///////////////////////////////Getting Register Page
router.get('/', userController.getRegisterPage);

///////////////////////////////Posting Registration Data to Database
router.post('/', userController.postRegister)

module.exports = router;