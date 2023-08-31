import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNew from './CreateNew'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

describe('<CreateNew />', () => {
    const mockAxios = new MockAdapter(axios)
    test('form calling props', async () => {
        const newBlogData = {
            title: 'title2',
            author: 'author2',
            url: 'url2',
            likes: 0,
        }
        mockAxios.onPost('/api/blogs').reply(201, { id: 'newBlogId', ...newBlogData })
        const blogs = []
        const mockSetBlog = jest.fn()
        const mockHandler = jest.fn()
        const user = userEvent.setup()


        render(<CreateNew setBlogs={mockSetBlog} blogs={blogs} setMessage={mockHandler} />)
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const submitButton = screen.getByText('create')

        await user.type(titleInput, 'title2')
        await user.type(authorInput, 'author2')
        await user.type(urlInput, 'url2')
        await user.click(submitButton)

        
        //console.log(mockSetBlog.mock.calls[0][0][0])

        expect(mockSetBlog.mock.calls).toHaveLength(1)
        expect(mockSetBlog.mock.calls[0][0][0].title).toBe('title2')
    })
})