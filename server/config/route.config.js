'use strict';

const controllers = require('../controllers/base.controller');

module.exports = (app) => {
    app
        .get('/', controllers.home.index)
        .get('/about', controllers.home.about)
        .all('*', (req, res) => {
            res.status(404).send('Error');
        })
}