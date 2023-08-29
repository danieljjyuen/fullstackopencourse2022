const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({username})

    const passwordVerify = user === null ?
    false 
    : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordVerify)){
        response.status(401).json({error: 'invalid user or password'})
    }

    const userInfoForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userInfoForToken, process.env.SECRET, { expiresIn: 60*60 })
    response.status(200).send({token, username:user.username, name: user.name, id:user._id} )

})

module.exports = loginRouter