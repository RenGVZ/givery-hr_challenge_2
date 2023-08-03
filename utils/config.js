require("dotenv").config()

const PORT = process.env.PORT
const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

DB_HOST_NAME = process.env.RDS_HOST_NAME
DB_USER = process.env.RDS_USER
DB_PASSWORD = process.env.RDS_PASSWORD
DB_DATABASE = process.env.RDS_DATABASE

module.exports = {
  PORT,
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  DB_HOST_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
}
