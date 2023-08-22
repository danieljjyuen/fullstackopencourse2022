const jwt = require('jsonwebtoken')

const unknownEndPoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const requestLogger = (request, response, next) => {
    console.log('method ', request.method)
    console.log('path ', request.path)
    console.log('body ', request.body)
    console.log('----')
    next()
}

const errorHandler = (error, request, response, next) =>{
    console.error(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }else if(error.name==='ValidationError'){
        return response.status(400).json({error:error.message})
    }else if(error.name==='JsonWebTokenError'){
        return response.status(401).json({error: error.message})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ','')
    }else{
        request.token = null
    }
    next()
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        const decodedToken =  jwt.verify(request.token,process.env.SECRET)
        request.user = decodedToken.id
    }
    next()
   
}

module.exports = {
    userExtractor,
    tokenExtractor,
    unknownEndPoint,
    requestLogger,
    errorHandler
}