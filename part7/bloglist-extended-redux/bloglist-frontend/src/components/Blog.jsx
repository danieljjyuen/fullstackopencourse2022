import { useState } from 'react'
import blogsService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, toDeleteBlog, voteBlog } from '../reducers/blogReducer'

const Blog = ({blog}) => {
    const user = useSelector(state=> state.loggedUser)
    const blogs = useSelector(state => state.blogs)
    console.log(blog)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    if(!blog || !user){
        return null
    }

    const updateLike = () => {
        dispatch(voteBlog(blog))
    }
    
    const deleteVisible = { display: blog.user.id === user.id ? '' : 'none' }
    const deleteHandle = async (deleteBlog) => {
        if (
            window.confirm(
                `Remove blog ${deleteBlog.name} by ${deleteBlog.author}`
            )
        ) {
            try {
                dispatch(toDeleteBlog(deleteBlog))
            } catch (error) {
                console.log(error)
            }
        }
    }


    const handleComment = async (event) => {
        event.preventDefault()
        console.log(comment)
        dispatch(addComment(blog, comment))
        setComment('')
    }
    return (
        <div className="blog">
            <h3>
            {blog.title} {blog.author}{' '}
            </h3>
            <div>
                <a href={blog.url}>{blog.url}</a>
                <br />
                likes {blog.likes}{' '}
                <button id="like" onClick={updateLike}>
                    like
                </button>
                <br />
                added by {blog.user.name}
                <div className="showRemove" style={deleteVisible}>
                    <button id="remove" onClick={()=>deleteHandle(blog)}>
                        remove
                    </button>
                </div>

                <h4>comments</h4>
                <div>
                    <form onSubmit={handleComment}>
                        <input name='comment'
                                type='text'
                                value={comment}
                                onChange={(event)=>setComment(event.target.value)}
                                /> 
                        <button type='submit'>add comment</button>
                    </form>
               
                <ul>
                    {blog.comments.map(comment=>
                        <li key={comment.id}>{comment}</li>)}
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Blog
