const express = require('express')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

const { users } = require('./data/users.json')
const { cards } = require('./data/cards.json')

const app = express()

const secret = 'SuperSecretSecret'

app.use(express.json())
app.use(express.static('./data'))
app.use(express.static('./public'))


app.post('/getToken', (req, res) => {
    const {username, password} = req.body
    const user = users.find((currUser) => currUser.username === username)
    if (!user || user.password !== password) {
        return res.status(401).json({errorMessage: 'Invalid Credentials'})
    }
    const token = jwt.sign({username: user.username}, secret, {algorithm: 'HS256', expiresIn: '1d'})
    return res.json({token: token})
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})