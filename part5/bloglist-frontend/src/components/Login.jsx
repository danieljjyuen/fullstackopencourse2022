import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from './Notification'

const Login =({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,password
        }
        try{
            const user = await loginService.login(credentials)
            console.log('crendtials ', credentials, ' user: ', user)
            window.localStorage.setItem('user',JSON.stringify(user))
            setUser(user)
            blogsService.setToken(user.token)
        }catch(error){
            console.log(error)
            setMessage({
                message:'wrong username or password',
                color:'red'
            })
            setTimeout(()=>{
                setMessage(null)
            },5000)
        }

        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <h2>log in to application</h2>
            <Notification message={message} />
            <form onSubmit={handleLogin}>
                <div>
                    username 
                    <input
                        name='username'
                        value={username}
                        type='text'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password 
                    <input 
                        name='password'
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )

}

export default Login