const Person = ({person, deleteHandler}) => {
  const {name, number, id} = person
  

    return <div>{name} {number}  <button onClick={()=>deleteHandler(person)}>delete</button></div>
  }
  
  export default Person