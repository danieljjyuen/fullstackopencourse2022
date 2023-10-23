import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {Route, Routes, Link, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const padding = {padding:5}
  const client = useApolloClient()
  const navigate = useNavigate()
  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)
  


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/books')
  }

  if(resultBooks.loading || !resultBooks || resultAuthors.loading || !resultAuthors){
    return(<div>loading...</div>)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=> {
      setErrorMessage(null)
    },5000)
  }
  return (
    <div>
      <div>
        <button>
          <Link style={{padding,textDecoration: 'none', color: 'black'}} to='/authors'>authors</Link>
        </button>
        <button>
          <Link style={{padding,textDecoration: 'none', color: 'black'}} to='/books'>books</Link>
        </button>
        
        {token ? 
          <button>
            <Link style={{padding,textDecoration: 'none', color: 'black'}} to='/add-book'>add book</Link>
          </button>
                :null 
        }
        {token?
          <button>
            <Link style={{padding,textDecoration:'none', color:'black'}} to='/recommend'>recommend</Link>
          </button>
              : null
          
        }
        {!token ? 
            <button>  
              <Link style={{padding,textDecoration: 'none', color: 'black'}} to='/login'>log in</Link> 
            </button>
                : <button onClick={logout}>logout</button>
        }
        
      </div>
      <Notify errorMessage={errorMessage}/>
      <Routes>
        <Route path='/authors' element={<Authors setError={notify} authors={resultAuthors.data.allAuthors}/>}/>
        <Route path='/books' element={<Books books={resultBooks.data.allBooks}/>}/>
        <Route path='/add-book' element={<NewBook setError={notify}/>}/>
        <Route path='/login' element={<LoginForm setToken={setToken} setError={notify}/>} />
        <Route path='/recommend' element={<Recommend books={resultBooks.data.allBooks}/>} />
      </Routes>
    </div>
  )
}

export default App
