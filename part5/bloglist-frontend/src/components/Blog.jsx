import { useState } from "react"
import blogsService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs,user }) => {
const [visible, setVisible] = useState(false)
const setVisibility = () => {
  setVisible(!visible)
}
const label = visible ? 'hide' : 'view'
const displayStyle = { display: visible ? '' : 'none'}
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const updateLike = async () => {
 const updatedBlog = {
  likes: blog.likes+1,
  author:blog.author,
  id:blog.id,
  title:blog.title,
  url:blog.url,
  user: blog.user.id
 }
 const returnedBlog = await blogsService.put(updatedBlog)
 setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
}

const deleteVisible = { display: blog.user.id === user.id ? '': 'none'}
const deleteHandle = async (deleteBlog) => {
  if(window.confirm(`Remove blog ${deleteBlog.name} by ${deleteBlog.author}`)){
    try{
      const response = await blogsService.remove(deleteBlog)
      setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
    }catch(error){
      console.log(error)
    }
  }
}

  return (
  <div style={blogStyle} className='blog'>
    {blog.title} {blog.author} <button onClick={setVisibility}>{label}</button>
    <div style = {displayStyle}>
      {blog.url}
      <br/>
      likes {blog.likes} <button onClick={updateLike}>like</button>
      <br/>
      {blog.user.name}
      <div style={deleteVisible}>
        <button onClick={()=>deleteHandle(blog)}>remove</button>
      </div>
    </div>
  </div> 
    ) 
  }

export default Blog