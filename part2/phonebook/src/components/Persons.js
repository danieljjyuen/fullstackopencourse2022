import Person from "./Person"

const Persons = ({persons}) => {
  const list = persons
  
  return(
    <div>
      {list.map(person => <Person key={person.name} person={person} /> )}
    </div>
  )
}

export default Persons

