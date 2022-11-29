require('dotenv').config();
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
const {
    User
} = require('./models/userDB');

const indexRouter = require("./routes/indexRoutes");
const registerRouter = require("./routes/registerRoutes");
const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/userRoutes");


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})

passport.use(new LocalStrategy((email, password, done) => {
    console.log(email);
    console.log(password);
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
            return done(null, user)
            // bcrypt.compare(password, user.password, (err, result) => {
            //     if (err) throw err;
            //     else {
            //         console.log(result);
            //     }
            // })
        }
    });
}))



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    mongoose.User.findById(id, (err, user) => {
        if (err) throw err;
        done(null, user)
    })
})



app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log("Server successfully started!");
})