import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')

  const onSubmitHandle = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }
    const found = persons.find(p => p.name === newName)

    found === undefined ? 
      setPersons(persons.concat(person)):
      window.alert(`${newName} is already added to phonebook`)

      setNewName('')
      setNewNumber('')
  }

  const list = newFilter === '' ? 
  persons :
  persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h3>Phonebook</h3>
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
        <Persons persons={list}/>
    </div>
  )
}

export default App