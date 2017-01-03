'use strict';

const homeController = require('./home.controller');
const userController = require('./user.controller');
const scopeController = require('./scope.controller');
const portfolioController = require('./portfolio.controller');


module.exports = {
    home: homeController,
    user: userController,
    scope: scopeController,
    portfolio: portfolioController
};