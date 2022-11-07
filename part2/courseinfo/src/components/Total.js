const Total = ({parts}) => {
  //const total = parts.map(part => part.exercises).reduce((s, n) => s + n)
  const total = parts.reduce((s, part) => s + part.exercises, 0)
  
  return (
    <div>
      <b>Number of exercises {total}</b>
    </div>
  )
}

export default Total