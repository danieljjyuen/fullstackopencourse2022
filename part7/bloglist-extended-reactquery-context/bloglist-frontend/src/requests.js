import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

export const setToken = (newToken) =>{
  token = `Bearer ${newToken}`
}

export const getBlogs = () => {
   return axios.get('http://localhost:3003/api/blogs').then(res=> res.data)
}

export const create = async (blog) => {
    const config = {
      headers: {
        Authorization: token
      }
    }
      const response = await axios.post(baseUrl, blog, config)
      return response.data
  }
  
 export const put = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return response.data
  }
  
  export const remove = async(blog) => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  }