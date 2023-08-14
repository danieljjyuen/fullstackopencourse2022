const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('bloglist are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('bloglist should be 0 after clearing list', async() => {
    await Blog.deleteMany({})
    const blogs = await api.get('/api/blogs')
    console.log(blogs.body)
    expect(blogs.body).toHaveLength(0)
})

test('2 sample bloglist are returned', async () => {
    let sampleList = [
        {
            title: 'blog title 1',
            author: 'blog author 1',
            url: 'www.blogsample1.com',
            likes: '1'
        },
        {
            title: 'blog title 2',
            author: 'blog author 2',
            url: 'www.blogsample2.com',
            likes: 2
        }
    ]

    await Blog.deleteMany({})
    const blogObject = sampleList.map(blog => new Blog(blog))
    const blogPromiseArray = blogObject.map(blog => blog.save())
    await Promise.all(blogPromiseArray)

    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(response => expect(response.body).toHaveLength(2))
    
})

test('property identifier is id', async () => {
    let sampleList = [
        {
            title: 'blog title 1',
            author: 'blog author 1',
            url: 'www.blogsample1.com',
            likes: '1'
        },
        {
            title: 'blog title 2',
            author: 'blog author 2',
            url: 'www.blogsample2.com',
            likes: 2
        }
    ]

    await Blog.deleteMany({})
    const blogObject = sampleList.map(blog => new Blog(blog))
    const blogPromiseArray = blogObject.map(blog => blog.save())
    await Promise.all(blogPromiseArray)

    const list = await Blog.find({})

    expect(list[0].id).toBeDefined()
})

test('test blog added', async () => {
    const newBlog = {
        title: 'testing add blog',
        author: 'blog author test add',
        url: 'testing add',
        likes:3
    }
    const currentBlog = await Blog.find({})

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogListIncreased = await Blog.find({})
    expect(blogListIncreased).toHaveLength(currentBlog.length+1)

})

test('if likes property is not provided, default to 0', async() => {
    await Blog.deleteMany({})
    const blog = {
        title:'no like provided',
        author:'testing',
        url:'testing.com'
    }
    const newBlog = new Blog(blog)
    await newBlog.save()
    const firstBlog = await Blog.find({})
    expect(firstBlog[0].likes).toEqual(0)
})

test('if missing title or url, status 400 bad request', async () => {
    const bloglist = [
        {
            title:'missing url',
            author:'testing',
        },
        {
            url:'missing title',
            author:'testing'
        }
    ]

    await Blog.deleteMany({})
    await api.post('/api/blogs')
    .send(bloglist[0])
    .expect(400)

    await api.post('/api/blogs/')
    .send(bloglist[1])
    .expect(400)
    
})
afterAll(async () => {
    await mongoose.connection.close()
})