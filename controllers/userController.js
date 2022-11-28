const bcrypt = require('bcryptjs');
const saltRounds = 5;

module.exports.getHomePage = function (req, res, next){
    res.render("index", {user: false});
}

module.exports.getRegisterPage = function(req, res, next){
    res.render("register");
}

module.exports.postRegister = function(req, res, next){
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
        const newUser = {
            role: req.body.role,
            email: req.body.email,
            password: hash
        }
        res.send(newUser);
    })
}

module.exports.getLoginPage = function(req, res, next){
    res.render("login");
}

module.exports.getUserPage = function(req, res, next){
    res.render("user");
}