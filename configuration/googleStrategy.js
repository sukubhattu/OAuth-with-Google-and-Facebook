const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

// note this id is monogdb id
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id).then((user) => {
        cb(null, user);
    });
});

// importing model
const User = require("../models/userModel");
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "/google/redirect",
        },
        (accessToken, refreshToken, profile, cb) => {
            // callback functions goes here
            // console.log(profile);
            // check if user exist
            User.findOne({ socialId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have this user
                    console.log("user already exists");
                    console.log("user is: ", currentUser);
                    // so call back function
                    cb(null, currentUser);
                } else {
                    // if not, create user in our db
                    new User({
                        socialId: profile.id,
                        username: profile.displayName,
                        imageURL: profile.photos[0].value,
                        // or profile['photos'][0]['value']
                    })
                        .save()
                        .then((newUser) => {
                            console.log("created new user: ", newUser);
                            cb(null, newUser);
                        });
                }
            });
        }
    )
);
