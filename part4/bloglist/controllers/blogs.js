const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try{
    const blogs = await Blog.find({}).populate('user',{username:1, name:1})
    response.json(blogs)
    }catch(error){
      next(error)
    }
  })
  
blogsRouter.post('/', async (request, response, next) => {
  try{
    const userId = request.user
    const user = await User.findById(userId)
    if(!user){
      response.status(404).json({error:'user can\'t be found'})
    }
     // console.log('user ,',user, ' user id ,',userId)
        const blog = new Blog({
          title: request.body.title,
          author:request.body.author,
          url:request.body.url,
          likes:request.body.likes,
          user:userId,
          comments:[]
        })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    await savedBlog.populate('user', {username:1, name:1})
    response.status(201).json(savedBlog)
  }catch(error){
    next(error)
  }

})
  
blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  // console.log('blog is ', blog)
  // console.log('blog.user.tostring  ', blog.user.toString() )
  // console.log('request.user.tostring   ,', request.user.toString())
  if(blog.user.toString() !== request.user.toString()){
    response.status(401).json({error: 'incorrect token'})
  }
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch(error){
      next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const {comment} = request.body

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments || []
  blog.comments = blog.comments.concat(comment)
  await blog.save()
  response.status(201).json(blog)

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url:body.url,
    likes:body.likes,
    user:body.userId,
    comments:body.comments
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    await updatedBlog.populate('user',{username:1, name:1})
    response.json(updatedBlog)
  }catch{
    response.status(500).end()
  }
})

module.exports = blogsRouter