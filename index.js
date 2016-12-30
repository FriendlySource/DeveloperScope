'use strict';

// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const port = process.env.NODE_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.NODE_IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

const serverConfig = require('./server/config/server.config.js')[env];

const app = express();

// DB CONFIG
require('./server/config/db.config.js')(serverConfig);

// APP CONFIG
require('./server/config/app.config.js')(serverConfig, app);

// ROUTE CONFIG
require('./server/config/route.config.js')(app);

// PASSPORT CONFIG
require('./server/config/passport.config.js')();

// START
app.listen(port, ip, () => {
    console.info(`[Server] is running on ${ip}:${port}`);
});