'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

module.exports = (config, app) => {
    app
        .set('view engine', 'pug')
        .set('views', `${config.rootPath}server/views`)
        .use(cookieParser())
        .use(bodyParser.urlencoded({ extended: true }))
        app.use(session({
            secret: 'epocSerpoleveD',
            store: new MongoStore({
                host: config.db.domain,
                port: config.db.port,
                db: 'sessions',
                url: `mongodb://${config.db.domain}:${config.db.port}/${config.db.name}`
            })
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use((req, res, next) => {

            if (req.user) {
            }

            next();
        })
        .use(express.static(`${config.rootPath}public`));
}