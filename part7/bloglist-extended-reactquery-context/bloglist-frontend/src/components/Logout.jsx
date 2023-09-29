import LoggedUserContext from "../LoggedUserContext"
import { useContext } from "react"
const Logout = () => {
    const [user, userDispatch] = useContext(LoggedUserContext)
    const handleLogout = () => {
        userDispatch({type:'CLEAR'})
        window.localStorage.removeItem('user')
    }
    return(
        <div>
            {user.name} logged in 
            <button id='logout-button' onClick={handleLogout}>log out</button>
            <br />
        </div>
    )
}

export default Logout