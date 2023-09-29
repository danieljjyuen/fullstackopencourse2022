import { useState, useContext } from "react"
import blogsService from '../services/blogs'
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { put, remove } from "../requests"
import LoggedUserContext from "../LoggedUserContext"

const Blog = ({ blog }) => {

const [user, userDispatch] = useContext(LoggedUserContext)
const queryClient = useQueryClient()
const updateBlogMutation = useMutation(put,  {
  onSuccess: (updatedBlog)=>{
  const blogs = queryClient.getQueryData(['blogs'])
  queryClient.setQueryData(['blogs'],blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }
})

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
updateBlogMutation.mutate(updatedBlog)

}

const removeBlogMutation = useMutation(remove, {
  onSuccess: (deleteBlog) => {
    const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'],blogs.filter(blog => blog.id !== deleteBlog.id))
  },
  onError:(error)=>console.log(error)
})

const deleteVisible = { display: blog.user.id === user.id ? '': 'none'}
const deleteHandle = async (deleteBlog) => {
  if(window.confirm(`Remove blog ${deleteBlog.name} by ${deleteBlog.author}`)){
    removeBlogMutation.mutate(deleteBlog)
  }
}

  return (
  <div style={blogStyle} className='blog'>
    {blog.title} {blog.author} <button id='toggleView' onClick={setVisibility}>{label}</button>
    <div style = {displayStyle}>
      {blog.url}
      <br/>
      likes {blog.likes} <button id='like' onClick={updateLike}>like</button>
      <br/>
      {blog.user.name}
      <div className='showRemove' style={deleteVisible}>
        <button id='remove' onClick={()=>deleteHandle(blog)}>remove</button>
      </div>
    </div>
  </div> 
    ) 
  }

export default Blog