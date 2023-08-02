require('dotenv').config()

const PORT = process.env.PORT
const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

module.exports = {
  PORT,
  HOST,
  USER,
  PASSWORD,
  DATABASE
}