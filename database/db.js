const mysql = require("mysql2")
const config = require("../utils/config")

const db = mysql
  .createConnection({
    host: config.RENDER_HOST_NAME,
    user: config.RENDER_USER,
    password: config.RENDER_PASSWORD,
    database: config.RENDER_DATABASE,
  }).promise()

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err)
    return
  }
  console.log("Connected to MySQL database")
})

module.exports = db
