'use strict';

let encryption = require('../utilities/encryption');
let validation = require('../utilities/validation');
let User = require('mongoose').model('User');

module.exports = {
    register: (req, res) => {
        res.render('user/register', {
            mainTitle: 'Register',
            activePage: 'register'
        });
    },
    login: (req, res) => {
        res.render('user/login', {
            mainTitle: 'Login',
            activePage: 'login'
        });
    },
    logout: (req, res) => {
        req.logout();
        
        res.redirect('/');
    },
    authenticate: (req, res) => {
        let userInput = req.body;

        userInput.globalMessages = [];
        
        if (!userInput.username || !userInput.password) {
            userInput.globalMessages.push('Please fill out all required fields');

            res.render('user/login', userInput);
        } else {
            User
                .findOne({ username: userInput.username })
                    .then(foundUser => {
                        if (!foundUser.authenticate(userInput.password)) {
                            userInput.globalMessages.push('Invalid password or username');

                            res.render('user/login', userInput)
                        } else {
                            req.login(foundUser, (err, user) => {
                                if (err) {
                                    res.render('user/register', {
                                        globalMessages: 'Server Internal Error: 500'
                                    })
                                } else {
                                    res.redirect('/');
                                }
                            })
                        }
                    })
        }
    },
    create: (req, res) => {
        let userInput = req.body;
        userInput.globalMessages = [];
        
        if (!userInput.username || !userInput.password || !userInput.confirmPassword) {
            userInput.globalMessages.push('Please fill out all required fields')

            res.render('user/register', userInput);
        } else if (userInput.password !== userInput.confirmPassword) {
            userInput.globalMessages.push('Both passwords does not match');

            res.render('user/register', userInput);
        } else {
            User.find({ username: userInput.username })
                .then(user => {
                    if (user.length) {
                        userInput.globalMessages.push(`${userInput.username} is already in use`);

                        res.render('user/register', userInput);
                    } else {
                        userInput.salt = encryption.generateSalt();
                        userInput.password = encryption.generateHashedPassword(userInput.salt, userInput.password);

                        User.create(userInput)
                            .then(user => {
                                req.login(user, (err, user) => {
                                    if (err) {
                                        res.render('user/register', {
                                            globalMessages: 'Server Internal Error: 500'
                                        })
                                    } else {
                                        res.redirect('/');
                                    }
                                });
                            })
                    }
                })
        }
    },
    showProfile: (req, res) => {
        res.render('user/profile', {
            mainTitle: `${req.user.username} Profile`,
            name: req.user.name,
            email: req.user.email,
            activePage: 'profile',
            csrfToken: req.csrfToken()
        });
    },
    updateProfile: (req, res) => {
        let profileUpdates = req.body,
            isFormValid = true;

        profileUpdates.globalMessages = [];

        if (!profileUpdates.oldPassword) {
            delete profileUpdates.password;
        } else {
            if (!req.user.authenticate(profileUpdates.oldPassword)) {
                profileUpdates.globalMessages.push('Old Password is not correct');
                isFormValid = false;
                delete profileUpdates.password;
            } else {
                if (validation.password.isWhitespace(profileUpdates.password)) {
                    profileUpdates.globalMessages.push('Password cannot be whitespace');
                    isFormValid = false;
                    delete profileUpdates.password;
                }
                
                if (!validation.password.willPassRequiredLength(profileUpdates.password, 6)) {
                    profileUpdates.globalMessages.push('Password must be atleast 6 characters long');
                    isFormValid = false;
                    delete profileUpdates.password;
                }
            }
        }
        
        if (isFormValid) {
            if (profileUpdates.password) {
                profileUpdates.password = encryption.generateHashedPassword(req.user.salt, profileUpdates.password);
            }

            User.findOneAndUpdate({ "username": req.user.username }, profileUpdates, { upsert: true }, (err, doc) => {
                if (err) {
                    console.error(err)
                }
            });
            
            res.redirect('/user/profile');
        } else {
            profileUpdates.csrfToken = req.csrfToken();
            res.render('user/profile', profileUpdates);
        }
    }
};