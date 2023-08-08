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
        return response.status(400).send({error:error.message})
    }
    next(error)
}

module.exports = {
    unknownEndPoint,
    requestLogger,
    errorHandler
}