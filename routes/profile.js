const router = require("express").Router();

// checking if user is logged in or not
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/");
    } else {
        next();
    }
};

router.get("/", authCheck, (req, res) => {
    // res.send("you are logged in, this is your profile - " + req.user.username);
    res.render("profile", { user: req.user });
});

module.exports = router;
