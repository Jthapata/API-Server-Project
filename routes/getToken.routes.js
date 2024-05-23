const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const tokenRouter = express.Router()
const { users } = require('../data/users.json')
dotenv.config()
const secret = process.env.secret

tokenRouter.post('/', (req, res) => {
    const {username, password} = req.body
    const user = users.find((currUser) => currUser.username === username)
    if (!user || user.password !== password) {
        return res.status(401).json({errorMessage: 'Invalid Credentials'})
    }
    const token = jwt.sign({username: user.username}, secret, {algorithm: 'HS256', expiresIn: '1d'})
    return res.json({token: token})
})

module.exports = tokenRouter