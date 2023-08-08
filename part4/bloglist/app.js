const express = require('express')
const app = express()
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log(`connecting to ${config.MONGODB_URI}`))
    .catch(error => console.error(`couldn't connect to ${config.MONGODB_URI}`, error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app