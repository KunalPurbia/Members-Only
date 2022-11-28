require('dotenv').config();
const express =  require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require("./routes/indexRoutes");
const registerRouter = require("./routes/registerRoutes");
const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, ()=>{
    console.log("Server successfully started!");
})