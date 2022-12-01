const bcrypt = require('bcryptjs');
const saltRounds = 5;

const messageDB = require('../models/messageModel');
const userDB = require('../models/userModel')

module.exports.getHomePage = async function (req, res, next) {
    const messages = await messageDB.getMessages();
    if (req.user) {
        if (req.user.member) {
            res.render("index", {
                user: false,
                member: true,
                admin: false,
                messages: messages
            });
        } else if (req.user.admin) {
            res.render("index", {
                user: false,
                member: false,
                admin: true,
                messages: messages
            });
        } else {
            res.render("index", {
                user: true,
                member: false,
                admin: false,
                messages: messages
            });
        }
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
        const userData = {}
        userData.fullname = req.body.fullname;
        userData.username= req.body.username;
        userData.password= hash;
        userDB.registerUser(userData)
        res.redirect("/login")
    })
}

module.exports.getLoginPage = function (req, res, next) {
    res.render("login");
}

module.exports.postLogin = function (req, res, next) {
    res.redirect("/")
}

module.exports.getMessageForm = function (req, res, next) {
    if(req.user){
        res.render('messageForm')
    } else{
        res.redirect("login")
    }
}

module.exports.postMessage = function (req, res, next) {
    if (req.user) {
        const data = {};
        data.title = req.body.title;
        data.message = req.body.message;
        data.date = new Date().toDateString();
        data.username = req.user.fullname;
        data.useremail = req.user.username;
        messageDB.saveMessage(data);
        res.redirect("/")
    } else {
        res.redirect("/login")
    }
}

module.exports.getMembershipForm = function (req, res, next) {
    if(req.user){
        res.render("membershipForm")
    } else{
        res.redirect("/")
    }
}

module.exports.updateMembership = function(req, res, next){
    if(req.user){
        if(req.body.password === process.env.ADMIN_SECRET){
            userDB.updateAdmin(req.user._id);
            res.redirect("/")
        } else if(req.body.password === process.env.MEMBER_SECRET){
            userDB.updateMember(req.user._id);
            res.redirect("/")
        }else{
            res.redirect("/login")
        }
    } else{
        res.redirect("/login")
    }
}

module.exports.deleteMessage = (req, res, next)=>{
    const id = req.params.id;
    messageDB.deleteMessage(id);
    res.redirect("/");
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