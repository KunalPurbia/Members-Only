const bcrypt = require('bcryptjs');
const saltRounds = 5;
const {
    User,
    Message
} = require('../config/database');

const messageDB = require('../models/messageModel')

module.exports.getHomePage = async function (req, res, next) {
    const messages = await messageDB.getMessages();
    if (req.user) {
        res.render("index", {
            user: true,
            member: false,
            admin: false,
            messages: messages
        });
    } else {
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
            if (err) throw err;
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
    res.redirect("/")
}

module.exports.getUserPage = function (req, res, next) {
    res.render("user");
}

module.exports.getMessageForm = function (req, res, next) {
    res.render('messageForm')
}

module.exports.postMessage = function (req, res, next) {
    const data = {};
    data.title = req.body.title;
    data.message = req.body.message;
    data.date = new Date().toDateString();
    data.username = req.user.fullname;
    data.useremail = req.user.username;
    new Message(data).save((err) => {
        if (err) {
            res.redirect("/login");
        } else {
            res.redirect("/");
        }
    })
}

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect("/")
        }
    })
}