import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [newFilter, setNewFilter] = useState('')

  const list = newFilter === '' ? 
    persons :
    persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

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

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newFilter} onChange={(event)=>setNewFilter(event.target.value)}/>
      <h2>add a new</h2>
      <form onSubmit={onSubmitHandle}>
        <div>
          name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => {setNewNumber(event.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {list.map(person => (<div>{person.name} {person.number}</div>))}
    </div>
  )
}

export default App