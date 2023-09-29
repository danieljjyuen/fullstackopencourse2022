import { useState, useEffect, useReducer,useContext } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import { useQuery } from '@tanstack/react-query'
import { getBlogs, setToken } from './requests'
import LoggedUserContext from './LoggedUserContext'


const App = () => {
  const [user, userDispatch] = useContext(LoggedUserContext)

  useEffect(()=> {
    const userJSON = window.localStorage.getItem('user')
    //console.log('userjson', userJSON)
    if(userJSON){
      const userParse = JSON.parse(userJSON)
      userDispatch({type:'SET', payload:userParse})
      setToken(userParse.token)
      
    }
  },[])
  
  const result = useQuery({
    queryKey:['blogs'],
    queryFn: getBlogs
  })

  if(result.isLoading){
    return(
      <div>
        loading data...
      </div>
    )
  }

  const blogs = result.data

  return(
      <div>
        {!user && <Login/>}
        {user && <Bloglist blogs={blogs} />}
      </div>
  )
}

export default App