const bcrypt = require('bcryptjs');
const saltRounds = 5;
const {
    User
} = require('../config/database');

const messageData = {};
messageData._id = "123";
messageData.author = "Kunal Purbia";
messageData.date = new Date();
messageData.message = "Hi I am Kunal Purbia"

const messages = [messageData];

module.exports.getHomePage = function (req, res, next) {
    if(req.user){
        res.render("index", {
            user: false,
            member: false,
            admin: false,
            messages: messages
        });
    } else{
        res.render("index", {
            user: false,
            member: false,
            admin: false,
            messages: messages
        });
    }
}

module.exports.getRegisterPage = function (req, res, next) {
    res.render("register");
}

module.exports.postRegister = function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newUser = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            password: hash
        }).save(err => {
            if (err) return next(err);
            else {
                res.render("index", {
                    user: true,
                    messages: messages
                })
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