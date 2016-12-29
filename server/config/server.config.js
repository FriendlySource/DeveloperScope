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
            port: process.env.MONGODB_PORT,
            domain: process.env.MONGODB_DOMAIN,
            name: process.env.MONGODB_NAME,
            connection: process.env.MONGODB_CONNECTION_STRING
        }
    }
};