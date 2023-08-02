const mysql = require("mysql2")
const config = require("../utils/config")

const db = mysql
  .createConnection({
    host: config.HOST,
    user: "root",
    password: config.PASSWORD,
    database: config.DATABASE,
  }).promise()

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err)
    return
  }
  console.log("Connected to MySQL database")
})

module.exports = db
