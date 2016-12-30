'use strict';

const path = require('path');
const serverRootPath = path.normalize(path.join(__dirname, '../../'));

module.exports = {
    development: {
        rootPath: serverRootPath,
        port: 3000,
        db: {
            port: 27017,
            domain: "localhost",
            name: "developer_scope",
            connection: 'mongodb://localhost:27017/developer_scope'
        }
    },
    production: {
        port: process.env.NODE_PORT,
        rootPath: serverRootPath,
        db: {
            port: process.env.MONGODB_PORT || '8080',
            domain: process.env.MONGODB_DOMAIN || '0.0.0.0',
            name: process.env.MONGODB_DATABASE || 'developer_scope',
            connection: process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL
        }
    }
};