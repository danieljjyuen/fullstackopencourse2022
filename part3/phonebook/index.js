
const express = require('express')
const { token } = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Person = require('./models/person')
let morgan = require('morgan')

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => response.json(result))
})

app.get('/info', (request, response) => {
  const date = new Date().toString()
  const statement = `Phonebook has info for ${persons.length} people`
  response.send(statement + '<br/><br/>' + date
  )
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(result => 
    response.json(result))

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number){
    return response.status(400).json({ error: 'content missing'})
  } else if (persons.find(person => person.name === body.name)){
    return response.status(400).json({ error: 'name must be unique'})
  }


  const person = new Person ({
    ...body
  })
  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
