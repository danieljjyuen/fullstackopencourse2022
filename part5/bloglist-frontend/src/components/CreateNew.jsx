import { useState } from 'react'
import blogsService from '../services/blogs'

const CreateNew = ({setBlogs, blogs, setMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {
            title, author, url
        }
        const response = await blogsService.create(newBlog)
        setBlogs(blogs.concat(response))
        setMessage({
            message:`new blog ${response.title} by ${response.author} added`,
            color: 'green'
        })
        setTimeout(() => {
            setMessage(null)
        },5000)
        setAuthor('')
        setTitle('')
        setUrl('')
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input 
                        name='title'
                        type='text'
                        value={title}
                        onChange={(event)=>setTitle(event.target.value)}
                        placeholder='title'
                        id='title'
                    />
                </div>
                <div>
                author:
                    <input
                        name='author'
                        type='text'
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        placeholder='author'
                        id='author'
                    />
                </div>
                <div>
                    url:
                    <input
                        name='url'
                        type='text'
                        value={url}
                        onChange={(event)=> setUrl(event.target.value)}
                        placeholder='url'
                        id='url'
                    />
                </div>
                <button type='submit' id='createSubmit'>create</button>
            </form>
        </div>
    )
}

export default CreateNew