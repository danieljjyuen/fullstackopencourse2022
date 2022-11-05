
const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {
      part: 'Fundamentals of React',
      exercises: 10,
    },
    {
      part: 'Using props to pass data',
      exercises: 7,
    },
    {
      part: 'State of a component',
      exercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({content}) => {
  return (
    <div>
      <p>
        {content[0].part} {content[0].exercises}
      </p>
      <p>
        {content[1].part} {content[1].exercises}
      </p>
      <p>
        {content[2].part} {content[2].exercises}
      </p>
    </div>
  )
}

const Total = ({content}) => {
  const total = content[0].exercises + content[1].exercises + content[2].exercises

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

export default App;
