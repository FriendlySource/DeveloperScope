'use strict';

const homeController = require('./home.controller');
const userController = require('./user.controller');

module.exports = {
    home: homeController,
    user: userController
};