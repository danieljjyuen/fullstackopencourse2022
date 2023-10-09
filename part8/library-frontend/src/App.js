import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {Route, Routes, Link } from 'react-router-dom'


const App = () => {
  const [page, setPage] = useState('authors')
  const padding = {padding:5}

  return (
    <div>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to='/add-book'>add book</Link>
      </div>
      <Routes>
        <Route path='/authors' element={<Authors/>}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/add-book' element={<NewBook />}/>
      </Routes>
    </div>
  )
}

export default App
