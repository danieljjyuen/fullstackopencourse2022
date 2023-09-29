import { Link, Navigate } from "react-router-dom"
import Logout from "./Logout"
import { Navbar } from "react-bootstrap"
const Navigation = ({user}) => {

    const style={
        paddingRight:5
    }
    return (
      <Navbar expand='lg'>
        <div className="row align-items-center">
            <div className="col">
            <Link style={style} to='/'>blogs</Link>
            <Link style={style} to='users'>users</Link>
            </div>
            <div className="col text-end">
            {user 
                ? <Logout/> 
                : <Navigate replace to='/login' />}
            </div>
            <h2>blogs app</h2>
        </div>
        </Navbar>
    )
}

export default Navigation