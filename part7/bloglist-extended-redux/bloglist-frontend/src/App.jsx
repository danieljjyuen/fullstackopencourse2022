import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import {  Routes, Route, Link, useNavigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Users from './components/Users'
import Content from './components/Content'


const App = () => {
    const user = useSelector(state=> state.loggedUser)
    const users = useSelector(state=> state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeLoggedUser())
        dispatch(initializeBlogs())
        dispatch(initializeUsers())

    }, [])

    return (
        <div className='container'>            
            {user ? <Content user={user} users={users}/> : <Login/>}
        </div>
    )
}

export default App
