const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }catch{
    response.status(400).end()
  }

})
  
blogsRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch{
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url:body.url,
    likes:body.likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log('from router method', updatedBlog)
    response.json(updatedBlog)
  }catch{
    response.status(500).end()
  }
})

module.exports = blogsRouter