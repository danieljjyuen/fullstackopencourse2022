import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Users = () => {
    const users = useSelector(state=> state.users)
    
    return(
        <div>
            <h2>Users</h2>
            <table>
                <tr>
                    <td></td>
                    <td><h3>blogs created</h3></td>
                </tr>
                {users.map(user=> 
                    <tr>
                        <td>
                            <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Users