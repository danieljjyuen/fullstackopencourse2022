import { useState, useContext } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'
import NotificationContext from '../NotificationContext'
import LoggedUserContext from '../LoggedUserContext'
import { setToken } from '../requests'

const Login =() => {
    const [user, userDispatch] = useContext(LoggedUserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, messageDispatch] = useContext(NotificationContext) 
    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,password
        }
        try{
            const user = await loginService.login(credentials)
            console.log('crendtials ', credentials, ' user: ', user)
            window.localStorage.setItem('user',JSON.stringify(user))
            userDispatch({type:'SET', payload: user})
            setToken(user.token)
        }catch(error){
            console.log(error)
            messageDispatch({
                type:'UPDATE',
                payload:
                {
                    message:'wrong username or password',
                    color:'red'
                }
            })
            setTimeout(()=>{
                messageDispatch({type:'CLEAR'})
            },5000)
        }

        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <h2>log in to application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
                <div>
                    username 
                    <input
                        name='username'
                        value={username}
                        type='text'
                        onChange={(event) => setUsername(event.target.value)}
                        id='login'
                    />
                </div>
                <div>
                    password 
                    <input 
                        name='password'
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id='password'
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )

}

export default Login