const express = require('express')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(() => console.log(`connecting to ${config.MONGODB_URI}`))
    .catch(error => console.error(`couldn't connect to ${config.MONGODB_URI}`, error.message))

app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(express.static('build'))
app.use(middleware.requestLogger)



app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app