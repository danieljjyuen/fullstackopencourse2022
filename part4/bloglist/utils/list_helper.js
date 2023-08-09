const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes)
        .reduce((preLike, currLike) => {
            return preLike + currLike
        })

}
const favoriteBlog = (blogs) => {
    return blogs.reduce((preBlog, currBlog) => {
        return currBlog.likes > preBlog.likes ? currBlog: preBlog
    })
}

const mostBlogs = (blogs) => {
    const hashmap = {}
    for(let i = 0 ; i < blogs.length; i++){
        if(blogs[i].author in hashmap){
            hashmap[blogs[i].author].blogs++
        }else{
            hashmap[blogs[i].author] = {
                author: blogs[i].author,
                blogs: 1
            }
        }
    }
    return Object.values(hashmap).reduce((preBlog, currBlog)=> {
        return preBlog.blogs > currBlog.blogs ? preBlog : currBlog
    })
}

const mostLikes = (blogs) => {
    const hashmap = {}
    for(let i = 0 ; i < blogs.length; i++){
        if(blogs[i].author in hashmap){
            hashmap[blogs[i].author].likes += blogs[i].likes
        }else{
            hashmap[blogs[i].author] = {
                author: blogs[i].author,
                likes: blogs[i].likes
            }
        }
    }
    return Object.values(hashmap).reduce((preBlog, currBlog) => {
        return preBlog.likes > currBlog.likes ? preBlog : currBlog
    })
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }