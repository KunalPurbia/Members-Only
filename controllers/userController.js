const bcrypt = require('bcryptjs');
const saltRounds = 5;
const {
    User
} = require('../models/userDB');

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
            email: req.body.email,
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
    console.log("Hello");
    console.log(req.body);
    res.send("Hello")
}

module.exports.getUserPage = function (req, res, next) {
    res.render("user");
}