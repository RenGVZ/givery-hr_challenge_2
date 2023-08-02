const express = require("express")
const app = express()
const recipesRouter = require("./controllers/recipes")

app.use(express.json())

app.use("/recipes", recipesRouter)

module.exports = app
