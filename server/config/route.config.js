'use strict';

const controllers = require('../controllers/base.controller');
const csrf = require('csurf') ({ cookie: true });

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

const isInRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role.indexof(role) > -1) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

module.exports = (app) => {
    app
        .get('/',  controllers.home.index)
        .get('/about', controllers.home.about)
        .get('/user/register', controllers.user.register)
        .post('/user/register', controllers.user.create)
        .get('/user/login', controllers.user.login)
        .post('/user/login', controllers.user.authenticate)
        .post('/user/logout', isAuthenticated, controllers.user.logout)
        .get('/user/profile', csrf, isAuthenticated, controllers.user.showProfile)
        .post('/user/profile', csrf, isAuthenticated, controllers.user.updateProfile)
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