import Blog from "./Blog";
import CreateNew from "./CreateNew";
import Logout from './Logout'
import {useState, useContext} from 'react'
import Notification from "./Notification";
import Togglable from "./Togglable";
import { useQueryClient } from "@tanstack/react-query";
import LoggedUserContext from "../LoggedUserContext";

const Bloglist = ({blogs}) => {
  const [user, userDispatch] = useContext(LoggedUserContext)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes )
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Logout  />
        <Togglable buttonLabel='create new'>
          <CreateNew />
        </Togglable>

          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
      )
}

export default Bloglist