import { useState, useContext } from 'react'
import blogsService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import { create } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CreateNew = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, messageDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()



    const newBlogMutation = useMutation({
        mutationFn:create, 
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            messageDispatch({
                type:'UPDATE',
                payload:
                {
                message:`new blog ${newBlog.title} by ${newBlog.author} added`,
                color: 'green'
                }
            })
            setTimeout(() => {
                messageDispatch({type:'CLEAR'})
            },5000)
        }
    })

    const handleCreate = async (event) => {
        event.preventDefault()
        const newBlog = {
            title, author, url
        }
        newBlogMutation.mutate(newBlog)
    
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