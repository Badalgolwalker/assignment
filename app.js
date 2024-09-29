const express = require("express");
const app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000

//connectdb
const db = require("./models/db").connect();

//body-parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//express-session
const session = require("express-session");
app.use(session({
    secret: process.env.Secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

//morgan
const logger = require("morgan");
app.use(logger("tiny"));

//routes
app.use("/", require("./routes/userroute"))
app.use("/book", require("./routes/bookroute"))
app.use("/transaction", require("./routes/transacionroute"))

//Errrhandler
const { generaterror } = require("./middleware/Error");
const Errorhandler = require("./utils/Errorhandler");
app.all("*", function (req, res,next) {
    return next (new Errorhandler("url not found", 404));
})

app.use(generaterror)

//port
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});