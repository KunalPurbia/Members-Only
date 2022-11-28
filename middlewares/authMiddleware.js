const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('../models/userDB');

module.exports.loginStrategy = passport.use(
    new LocalStrategy((username, password, done)=>{
        mongoose.model.User.findOne({
            username: username
        }, (err, user)=>{
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {
                    message: "Incorrect username/email"
                })
            }
            return done(null, user);
        });
    })
);

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    mongoose.User.findById(id, (err, user)=>{
        if(err) throw err;
        done(null, user)
    })
})