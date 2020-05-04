const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

// importing keys
const keys = require("./configuration/keys");

// initializing app
const app = express();

// for ejs template engine
app.set("view engine", "ejs");

// connecting to database
mongoose.connect(keys.mongodb.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db = mongoose.connection;
// Check errors
db.on("error", (err) => {
    console.log(err);
});
// Check connection
db.once("open", () => {
    console.log("connected to mongodb");
});

// set up session cookies
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey],
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// index route
app.get("/", (req, res) => {
    res.render("index");
});

// Google route
app.use("/google", require("./routes/googleAuthRoute"));

// facebook route
app.use("/facebook", require("./routes/facebookAuthRoute"));

// profile route
app.use("/profile", require("./routes/profile"));

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
