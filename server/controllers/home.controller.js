'use strict';

module.exports = {
    index: (req, res) => {
        res.render('home', {
            mainTitle: 'Home',
            activePage: 'Home'
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