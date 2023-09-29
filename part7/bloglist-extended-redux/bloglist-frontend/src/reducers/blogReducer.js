import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import blogsService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState:[],
    reducers:{
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action){
            return state.concat(action.payload)
        },
        updateBlog(state, action){
            const newBlog = action.payload
            return state.map(state=> state.id === newBlog.id? newBlog: state)
        },
        removeBlog(state, action){
            const blogToRemove = action.payload
            return state.filter(state=> state.id !== blogToRemove.id)
        }
    }

})

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}
export const initializeBlogs = () => {
    return async dispatch =>{
        const blogs = await blogsService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const voteBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = {
            likes: blog.likes + 1,
            author: blog.author,
            id: blog.id,
            title: blog.title,
            url: blog.url,
            user: blog.user.id,
        }
        const returnedBlog = await blogsService.put(updatedBlog)
        dispatch(updateBlog(returnedBlog))
    }
}
export const toDeleteBlog = (deleteBlog) => {
    return async dispatch => {
        await blogsService.remove(deleteBlog)
        dispatch(removeBlog(deleteBlog))
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        const updatedBlogComment = await blogsService.writeComment(blog, comment)
        dispatch(updateBlog(updatedBlogComment))
    }
}


export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer