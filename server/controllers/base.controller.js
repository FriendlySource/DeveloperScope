'use strict';

const homeController = require('./home.controller');
const userController = require('./user.controller');
const bioController = require('./bio.controller');
const portfolioController = require('./portfolio.controller');


module.exports = {
    home: homeController,
    user: userController,
    bio: bioController,
    portfolio: portfolioController
};