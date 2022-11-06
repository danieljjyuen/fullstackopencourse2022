
const App = () => {
  const course = {  
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
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
    <div>{content.name} {content.exercises}</div>
  )
}

export default App;
