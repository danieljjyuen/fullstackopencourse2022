import Blog from "./Blog";
import CreateNew from "./CreateNew";
import Logout from './Logout'
import {useState} from 'react'
import Notification from "./Notification";
import Togglable from "./Togglable";

const Bloglist = ({blogs,user,setUser,setBlogs}) => {
  const [message, setMessage] = useState(null)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes )
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <Logout user={user} setUser={setUser} />
        <Togglable buttonLabel='create new'>
          <CreateNew blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
        </Togglable>

          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
          )}
      </div>
      )
}

export default Bloglist