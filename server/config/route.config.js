'use strict';

const controllers = require('../controllers/base.controller');

module.exports = (app) => {
    app
        .get('/', controllers.home.index)
        .get('/about', controllers.home.about)
        .get('/user/register', controllers.user.register)
        .post('/user/register', controllers.user.create)
        .get('/user/login', controllers.user.login)
        .post('/user/login', controllers.user.authenticate)
        .post('/user/logout', controllers.user.logout)
        .all('*', (req, res) => {
            res.status(404).send('Error');
        })
}