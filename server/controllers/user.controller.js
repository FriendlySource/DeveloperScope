'use strict';

let encryption = require('../utilities/encryption');
let User = require('mongoose').model('User');

module.exports = {
    register: (req, res) => {
        res.render('user/register', {
            mainTitle: 'Register'
        });
    },
    login: (req, res) => {
        res.render('user/login', {
            mainTitle: 'Login' 
        });
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
    }
};