import Blog from './Blog'
import CreateNew from './CreateNew'
import Logout from './Logout'
import { useState } from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Bloglist = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <Togglable buttonLabel="create new">
                <CreateNew
                    blogs={blogs}
                />
            </Togglable>
        <Table striped bordered hover size='sm'>
            <tbody>
            {sortedBlogs.map((blog) => (
                <tr key={blog.id}>
                    <td>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </div>
    )
}

export default Bloglist
