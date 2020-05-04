const router = require("express").Router();
// for login with google
const passport = require("passport");

// importing googleStrategy.js so that passport.authenticate knows what google is
const googleStrategy = require("../configuration/googleStrategy");

// login URL
router.get(
    "/login",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

// logout URL
router.get("/logout", (req, res) => {
    // res.send("logging out");
    req.logOut();
    res.redirect("/");
});

// redirect URL
// this redirected url comes with information sent from google
// adding passport.authenticate middleware to use that information in callback function of googleStrategy
router.get("/redirect", passport.authenticate("google"), (req, res) => {
    // res.send("you have been redirected from google");
    // viewing user detail
    // res.send(req.user);
    // lets redirect to profile
    res.redirect("/profile/");
});

// exporting to use in other module
module.exports = router;
