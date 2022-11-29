const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {
    User
} = require('../../models/userDB');

module.exports.strategy = new LocalStrategy((email, password, done) => {
    User.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: "Incorrect email"
            })
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                else {
                    console.log(result);
                }
            })
        }
    });
});