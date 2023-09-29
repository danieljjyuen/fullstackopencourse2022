import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { fiveSecondMessage } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { login } from "../reducers/loggedUserReducer"
import { Form, Button} from 'react-bootstrap'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password,
        }
        dispatch(login(credentials))

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>log in to application</h2>
            <Notification />
            <Form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        name="username"
                        value={username}
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                        id="login"
                    />
                </div>
                <div>
                    password
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                </div>
                <Button type="submit">login</Button>
            </Form>
        </div>
    )
}

export default Login
