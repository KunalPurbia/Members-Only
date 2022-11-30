const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const passport = require('../services/passport/passport');
const passport = require('passport')

///////////////////////////////Getting Login Page
router.get('/', userController.getLoginPage);

///////////////////////////////User Login
router.post('/', passport.authenticate('local', {
    failureRedirect: '/login'
}), userController.postLogin);

module.exports = router;