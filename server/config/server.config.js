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
        db: `${process.env.OPENSHIFT_MONGODB_DB_URL}introduceme`,
        port: process.env.port,
        rootPath: serverRootPath
    }
};