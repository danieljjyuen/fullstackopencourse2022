import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Bloglist from './components/Bloglist'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const userJSON = window.localStorage.getItem('user')
    //console.log('userjson', userJSON)
    if(userJSON){
      const userParse = JSON.parse(userJSON)
      setUser(userParse)
      blogsService.setToken(userParse.token)
    }
  },[])
  
  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return(
    <div>
      {!user && <Login setUser={setUser}/>}
      {user && <Bloglist blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs}/>}
    </div>
  )
}

export default App