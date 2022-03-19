"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.urlApi = exports.PORT = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const portMysql = process.env.MYSQL_PORT || 9052;
const hostMysql = process.env.MYSQL_HOST || 'localhost';
exports.PORT = 8080;
const MYSQLCONFIG = {
    database: 'test_db',
    dialect: 'mysql',
    username: 'root',
    password: 'user',
    host: hostMysql,
    port: portMysql,
    logging: !(process.env.NODE_ENV === 'production'),
    models: [__dirname + '/../models']
};
exports.urlApi = {
    flirk: 'https://www.flickr.com/services/oembed/?format=json&url=',
    vimeo: 'https://vimeo.com/api/oembed.json?url='
};
exports.db = new sequelize_typescript_1.Sequelize(MYSQLCONFIG);
