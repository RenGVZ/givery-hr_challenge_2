const mysql = require("mysql2")
const config = require("../utils/config")

const db = mysql
  .createConnection({
    host: config.DB_HOST_NAME,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
  }).promise()

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err)
    return
  }
  console.log("Connected to MySQL database")
})

module.exports = db
