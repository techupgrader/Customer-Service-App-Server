const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

process.env.SECRET_KEY = 'secret'

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const routes = require('./src/routes')

app.use('/', routes)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
