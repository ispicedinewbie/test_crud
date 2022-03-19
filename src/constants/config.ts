import { Sequelize, SequelizeOptions } from "sequelize-typescript"
const portMysql = process.env.MYSQL_PORT || 9052
const hostMysql = process.env.MYSQL_HOST || 'localhost'
export const PORT = 8080

const MYSQLCONFIG:SequelizeOptions = {
  database: 'test_db',
  dialect: 'mysql',
  username: 'root',
  password: 'user',
  host: hostMysql,
  port: <number>portMysql,
  logging: !(process.env.NODE_ENV === 'production'),
  models: [__dirname + '/../models']
}


export const urlApi = {
  flirk: 'https://www.flickr.com/services/oembed/?format=json&url=',
  vimeo: 'https://vimeo.com/api/oembed.json?url='
}

export const db = new Sequelize(MYSQLCONFIG)