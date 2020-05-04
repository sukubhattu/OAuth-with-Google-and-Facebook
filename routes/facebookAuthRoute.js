const router = require("express").Router();
// for login with facebook
const passport = require("passport");

// importing googleStrategy.js so that passport.authenticate knows what google is
const facebookStrategy = require("../configuration/facebookStrategy");

// login URL
router.get("/login", passport.authenticate("facebook"));

router.get("/logout", (req, res) => {
    // res.send("logging out");
    req.logOut();
    res.redirect("/");
});

router.get("/redirect", passport.authenticate("facebook"), (req, res) => {
    // res.send("you have been redirected from google");
    // viewing user detail
    // res.send(req.user);
    // lets redirect to profile
    res.redirect("/profile/");
});

module.exports = router;
