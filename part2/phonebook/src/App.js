import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsService from "./services/Persons"
import Notification from "./components/Notification";
import './notification.css'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState(null)

  useEffect(() => {
    PersonsService.getAll()
                  .then(initialPersons => setPersons(initialPersons))
  },[])

  const onSubmitHandle = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const found = persons.find(p => p.name === newName)
    
    if(found === undefined){
      PersonsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setStyle('successful')
        })
        .catch(error => {
          setMessage(`${error.response.data.error}`)
          setStyle('error')
          console.log(error.response.data)
        })
        
      } 
      else if(window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)){
        PersonsService.update(found.id, newPerson).then( success =>{
          setPersons(persons.map(person => person.id === found.id ? newPerson : person))
          setMessage(`${newName} updated`)
          setStyle('successful')}
        ).catch(error => {
          setMessage(`Information on ${newName} has already been removed from the server`)
          setStyle('error')
          console.log(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
            setStyle(null)
          },5000)
        })
      }

      setTimeout(() => {
        setMessage(null)
        setStyle(null)
      },5000)

      setNewName('')
      setNewNumber('')
  }

  const deleteHandler = (person) => {
    const {id, name} = person
    if(window.confirm(`Delete ${name}?`)){
      PersonsService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setMessage(`Information on ${name} has already been removed from the server`)
          setStyle('error')

          setTimeout(() => {
            setMessage(null)
            setStyle(null)
          },5000)
        })
    }
    
  }
  const list = newFilter === '' ? 
  persons :
  persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h3>Phonebook</h3>
      <Notification message={message} style={style} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h3>add a new</h3>
      <PersonForm 
        onSubmitHandle={onSubmitHandle}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber} 
      />
      <h3>Numbers</h3>
        <Persons persons={list} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App