const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///////////////////////////////Getting HomePage
router.get('/', userController.getHomePage);

module.exports = router;