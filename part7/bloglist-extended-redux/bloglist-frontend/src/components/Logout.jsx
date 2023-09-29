import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/loggedUserReducer"
const Logout = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=> state.loggedUser)
    
    const handleLogout = () => {
        dispatch(logout())
    }
    if(user){
        return (
            <div>
                {user.name} logged in
                <button id="logout-button" onClick={handleLogout}>
                    log out
                </button>
                <br />
            </div>
        )
    }
}

export default Logout
