'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (config, app) => {
    app
        .set('view engine', 'pug')
        .set('views', `${config.rootPath}server/views`)
        .use(cookieParser())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(session({
            secret: "eMecudortnI",
            resave: true,
            saveUninitialized: true
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use((req, res, next) => {
            console.log(req.user)

            if (req.user) {
                res.locals.currentUser = req.user;
            }

            next();
        })
        .use(express.static(`${config.rootPath}public`));
}