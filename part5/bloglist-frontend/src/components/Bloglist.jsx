import Blog from "./Blog";
import CreateNew from "./CreateNew";
import Logout from './Logout'
import {useState} from 'react'
import Notification from "./Notification";
const Bloglist = ({blogs,user,setUser,setBlogs}) => {
  const [message, setMessage] = useState(null)
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <Logout user={user} setUser={setUser} />
        <CreateNew blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
      )
}

export default Bloglist