const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///////////////////////////////Getting HomePage
router.get('/', userController.getUserPage);

module.exports = router;