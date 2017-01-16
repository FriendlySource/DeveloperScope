'use strict';

let User = require('../models/user.model');
module.exports = {
    index: (req, res) => {
        User.top(5)
            .then(foundUsers => {
                res.render('home', {
                    mainTitle: 'Home',
                    activePage: 'Home',
                    top: foundUsers
                });
            });
    },
    about: (req, res) => {
        var user = req.user;

        res.render('about', {
            mainTitle: 'About',
            activePage: 'About'
        });
    }
};