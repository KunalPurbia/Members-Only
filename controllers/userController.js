const bcrypt = require('bcryptjs');
const saltRounds = 5;
const {
    User
} = require('../config/database');

module.exports.getHomePage = function (req, res, next) {
    res.render("index", {
        user: false
    });
}

module.exports.getRegisterPage = function (req, res, next) {
    res.render("register");
}

module.exports.postRegister = function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            role: req.body.role,
            username: req.body.username,
            password: hash
        }).save(err => {
            if (err) return next(err);
            else {
                res.redirect("/login")
            }
        })
    })
}

module.exports.getLoginPage = function (req, res, next) {
    res.render("login");
}

module.exports.postLogin = function (req, res, next) {
    res.render("index", {
        user: true
    })
}

module.exports.getUserPage = function (req, res, next) {
    res.render("user");
}