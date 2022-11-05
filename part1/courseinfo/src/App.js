
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
      <Part content={content[0]} />
      <Part content={content[1]} />
      <Part content={content[2]} />
    </div>
  )
}

const Total = ({content}) => {
  const total = content[0].exercises + content[1].exercises + content[2].exercises

  return (
    <div>
      Number of exercises {total}
    </div>
  )
}

const Part = ({content}) => {
  return (
    <div>{content.part} {content.exercises}</div>
  )
}

export default App;
