'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.db.connection);

    let db = mongoose.connection;
    
    db.once('open', err => {
        if (err) {
            console.error(err)
        } else {
            console.log('[DB] is ready')
        }
    })

    db.on('error', err => console.error);

    require('../models/user.model').seed(['admin', 'pesho', 'gosho', 'dido', 'ivan', 'dido', 'kiro', 'vasko', 'misho']);
}