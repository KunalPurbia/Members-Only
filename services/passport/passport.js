const passport = require('passport');
const {strategy} = require('./localStrategy');

passport.use(strategy);

module.exports = passport;