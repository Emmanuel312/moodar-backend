require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const cors = require('cors')
const { url_database_config } = require('./config/database')

mongoose.connect(process.env.URL_DATABASE_CONFIG || url_database_config, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);

app.use((req,res,next) =>
{
    req.io = io
    next()
})
app.use(express.json())
app.use(cors())

app.use(require('./routes'))
server.listen(process.env.PORT || 3000, () => console.log('server on port 3000'))