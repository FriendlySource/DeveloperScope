'use strict';

const controllers = require('../controllers/base.controller');
const csrf = require('csurf') ({ cookie: true });

const authorize = (req, res) => {
    if (!req.user) {
        res.redirect('/');
    }
}

module.exports = (app) => {
    app
        .get('/', controllers.home.index)
        .get('/about', controllers.home.about)
        .get('/user/register', controllers.user.register)
        .post('/user/register', controllers.user.create)
        .get('/user/login', controllers.user.login)
        .post('/user/login', controllers.user.authenticate)
        .post('/user/logout', controllers.user.logout)
        .get('/user/profile', csrf, authorize, controllers.user.showProfile)
        .post('/user/profile', csrf, authorize, controllers.user.updateProfile)
        .get('/error', function(req, res) {
            res.render('partial/404', {
                message: "The page was not found",
                mainTitle: "Error 404",
                status: "404"
            })
        })
        .all('*', (req, res) => {
            res.redirect('/error');
        })
}