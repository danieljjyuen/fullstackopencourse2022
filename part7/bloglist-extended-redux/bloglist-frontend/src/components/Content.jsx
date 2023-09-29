import { Route, Routes,Navigate, useMatch} from 'react-router-dom'
import Login from './Login'
import Bloglist from './Bloglist'
import Users from './Users'
import Navigation from './Navigation'
import UserSingleView from './UserSingleView'
import { useSelector } from 'react-redux'
import Blog from './Blog'
const Content = ({user, users}) => {
    const blogs = useSelector(state=> state.blogs)
    const matchUser = useMatch('/users/:id')
    const matchBlog = useMatch('/blogs/:id')
    
    const userSelected = matchUser
        ? users.find(user=> user.id === (match.params.id))
        : null
    
    const blogSelected = matchBlog
        ? blogs.find(blog=> blog.id===matchBlog.params.id)
        : null
    
    return (
        <div>
            <Navigation user={user}/>
            <Routes>
                <Route path='/login' element={!user?<Login/> : <Navigate replace to='/'/>} />
                <Route path='/' element={<Bloglist user={user}/>}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/users/:id' element={<UserSingleView userSelected={userSelected}/>}/>
                <Route path='/blogs/:id' element={<Blog blog={blogSelected} />}/>
            </Routes>

        </div>
    )
}


export default Content