const Logout = ({user, setUser}) => {
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('user')
    }
    return(
        <div>
            {user.name} logged in 
            <button onClick={handleLogout}>log out</button>
            <br />
        </div>
    )
}

export default Logout