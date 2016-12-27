'use strict';

const path = require('path');
const serverRootPath = path.normalize(path.join(__dirname, '../../'));

module.exports = {
    development: {
        rootPath: serverRootPath,
        db: {
            port: 27017,
            domain: "localhost",
            name: "developer_scope",
            connection: 'mongodb://localhost:27017/developer_scope'
        },
        port: 3000
    },
    production: {
        db: {
            port: process.env.MONGO_DB_PORT,
            domain: process.env.MONGO_DB_DOMAIN,
            name: process.env.MONGO_DB_NAME,
            connection: `${process.env.MONGODB_DB_URL}${process.env.MONGO_DB_NAME}`
        },
        port: process.env.port,
        rootPath: serverRootPath
    }
};