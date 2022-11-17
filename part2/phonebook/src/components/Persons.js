import Person from "./Person"

const Persons = ({persons, deleteHandler}) => {
  const list = persons
  
  return(
    <div>
      {list.map(person => <Person key={person.name} person={person} deleteHandler={deleteHandler} /> )}
    </div>
  )
}

export default Persons

