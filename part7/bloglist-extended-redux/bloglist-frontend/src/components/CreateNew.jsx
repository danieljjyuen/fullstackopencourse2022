import { useState } from 'react'
import blogsService from '../services/blogs'
import { fiveSecondMessage } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {Form, Button} from 'react-bootstrap'

const CreateNew = ({ setBlogs, blogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
        }
        dispatch(createBlog(newBlog))
        dispatch(fiveSecondMessage({
            message: `new blog ${newBlog.title} by ${newBlog.author} added`,
            color: 'green',
        }))
        
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return (
        <div>
            <h3>create new</h3>
            <Form onSubmit={handleCreate}>
                <div>
                    title:
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="title"
                        id="title"
                    />
                </div>
                <div>
                    author:
                    <input
                        name="author"
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        placeholder="author"
                        id="author"
                    />
                </div>
                <div>
                    url:
                    <input
                        name="url"
                        type="text"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="url"
                        id="url"
                    />
                </div>
                <Button type="submit" id="createSubmit">
                    create
                </Button>
            </Form>
        </div>
    )
}

export default CreateNew
