'use strict';

const path = require('path');
const serverRootPath = path.normalize(path.join(__dirname, '../../'));

module.exports = {
    development: {
        rootPath: serverRootPath,
        db: 'mongodb://localhost:27017/developer_scope',
        port: 3000
    },
    production: {
        db: `${process.env.MONGODB_DB_URL}developer_scope`,
        port: process.env.port,
        rootPath: serverRootPath
    }
};