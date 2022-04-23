const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

app.use(express.static('build'));
app.use(cors())
const port = process.env.PORT || 3001

dotenv.config();
process.env.SECRET_KEY = 'secret'


app.use(bodyParser.json())
app.use(express.static('build'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const routes = require('./src/routes')

app.listen(port, function () {
  console.log('Server is running on port: ' + port)
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

app.use('/', routes);