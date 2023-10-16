import { useState } from 'react'
import { useField } from './hooks'
import {
  Routes,
  Link,
  Route,
  useMatch,
  useNavigate,
  useParams,
  Navigate
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      {/* <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a> */}

      
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
      
    </div>

  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
        {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const {reset: contentReset, ...content} = useField('text')
  const {reset: authorReset, ...author} = useField('text')
  const {reset: infoReset, ...info} = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    contentReset
    authorReset
    infoReset
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
const Anecdote = ({anecdote}) => {
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      has {anecdote.votes} votes
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const Notification = ({notification}) => {
    const style = {
      'color':'grey',
      'paddingTop':'5px',
      'fontSize':'15px'

    }
    if(notification===null || notification===''){
      return null
    }
    return(
      <div style={style}>
        {notification}
      </div>
    )
  }
  
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    
    navigate('/')
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(()=> {
      setNotification('')
    },5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch(`/anecdotes/:id`)
  const anecdote = match ? anecdotes.find(anecdote=> anecdote.id === Number(match.params.id)) 
  :null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path='/create' element={<CreateNew addNew={addNew}/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App