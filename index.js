const app = require('./app')
const config = require('./utils/config')

const PORT = process.env.PORT || 3001

// console.log('process.env:', process.env)

app.listen(PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
