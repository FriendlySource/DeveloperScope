'use strict';

const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

const passportOptions = {
    "usernameField": "email",
    "passwordField": "password",
    "session": true
};

module.exports = () => {
    passport.use(new LocalPassport(passportOptions, (usernameInput, passwordInput, done) => {
        User
            .findOne({ username: usernameInput })
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }

                if (!user.authenticate(password)) {
                    return done(null, false);
                }

                return done(null, user);
            })
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            })
    });
};