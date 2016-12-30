'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    var mongoURLLabel = '',
        mongoURL = config.db.connection;

    if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
        var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),

            mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
            mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
            mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
            mongoPassword = process.env[mongoServiceName + '_PASSWORD']
        mongoUser = process.env[mongoServiceName + '_USER'];

        if (mongoHost && mongoPort && mongoDatabase) {
            mongoURLLabel = mongoURL = 'mongodb://';
            if (mongoUser && mongoPassword) {
                mongoURL += mongoUser + ':' + mongoPassword + '@';
            }
            // Provide UI label that excludes user id and pw
            mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
            mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

        }
    }

    mongoose.connect(mongoURL);

    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            console.error(err)
        } else {
            console.log('[DB] is ready')
        }
    })

    db.on('error', err => console.error);

    require('../models/user.model').seedAdminUser();
}