'use strict';

const path = require('path');
const serverRootPath = path.normalize(path.join(__dirname, '../../'));

module.exports = {
    development: {
        rootPath: serverRootPath,
        db: 'mongodb://localhost:27017/introduceme',
        port: 3000
    },
    production: {
        db: process.env._MONGO_DB_CONNECTION_STRING,
        port: process.env.port,
        rootPath: serverRootPath
    }
};