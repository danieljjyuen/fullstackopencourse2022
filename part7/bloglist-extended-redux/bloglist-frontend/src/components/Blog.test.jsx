import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('<Blog/>', () => {
    const mockHandler = jest.fn()
    const mockAxios = new MockAdapter(axios)
    beforeEach(() => {
        const user = {
            token: '',
            username: '',
            name: '',
        }
        const newBlog = {
            title: 'title1',
            author: 'author1',
            url: 'url1',
            likes: 0,
            user: {},
        }
        const blogs = []
        render(
            <Blog
                blog={newBlog}
                setBlogs={mockHandler}
                blogs={blogs}
                user={user}
            />
        )
    })

    test('only show title and author', () => {
        const combinedElement = screen.getByText(`title1 author1`)
        expect(combinedElement).toBeDefined()
    })
    test('url and likes not rendered by default', () => {
        const queryLikes = screen.queryByText('likes')
        const queryUrl = screen.queryByText('url1')
        expect(queryLikes).toBeNull()
        expect(queryUrl).toBeNull()
    })
    test('likes and url are shown after clicking view', async () => {
        const userE = userEvent.setup()
        const button = screen.getByText('view')
        await userE.click(button)
        const queryLikes = screen.queryByText('likes')
        const queryUrl = screen.queryByText('Url1')
        expect(queryLikes).toBeDefined()
        expect(queryUrl).toBeDefined()
    })
    test('2 likes click -> 2 calls', async () => {
        mockAxios.onPut().reply(200, { likes: 2 })
        const userE = userEvent.setup()
        const button = screen.getByText('view')
        await userE.click(button)
        //screen.debug()
        const buttonLike = screen.getByText('like')
        await userE.click(buttonLike)
        await userE.click(buttonLike)
        //expect(mockHandler).toHaveBeenCalledTimes(2)
        //expect(mockHandler.mock.calls).toHaveLength(2)
        expect(mockHandler).toHaveBeenCalledTimes(2)
    })
})
