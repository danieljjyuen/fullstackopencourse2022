import loginService from '../services/login'

const Login = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handeLogin = (event) => {
        event.preventDefault()
    }
    return(
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handeLogin}>
                <div>
                    username
                        <input 
                            name='username'
                            type='text'
                            value={username}
                            onChange={(target)=>setUsername(target.value)}
                        
                        />
                </div>
                <div>
                    password
                        <input
                            name='password'
                            type='password'
                            value={password}
                            onChange={(target)=>setPassword(target.value)}
                        />
                </div>        
            </form>
        </div>
    )
}

export default Login