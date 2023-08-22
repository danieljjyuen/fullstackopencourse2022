//Also, implement tests that ensure invalid users are not created and 
//that an invalid add user operation returns a suitable status code and error message.

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe('testing user validations', () => {
    test('missing username', async() => {
        const user = {
            name: 'test2', 
            password:'password2'
        }
    
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const findUser = await User.find({})
        console.log('find user : ', findUser)
        expect(findUser).toHaveLength(0)
    })
    test('username shorter than 3 letter', async() => {
        const user = {
            username: 'te',
            password:'test12',
            name:'name123'
        
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const findUser = await User.find({}) 
        expect(findUser).toHaveLength(0)   
    })
    test('missing password', async () => {
        const user = {
            username:'username123',
            name:'testingname'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const findUsers = await User.find({})
        expect(findUsers).toHaveLength(0)
    })
})
afterAll(async () => {
   await mongoose.connection.close()
})