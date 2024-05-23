const express = require('express')
const { expressjwt } = require('express-jwt')

const { users } = require('./data/users.json')
const { cards } = require('./data/cards.json')
const tokenRouter = require('./routes/getToken.routes')
const cardsRouter = require('./routes/cards.routes')

const app = express()
configureServer()
createRoutes()


function configureServer() {
    app.use(express.json())
    app.use(express.static('./data'))
    app.use(express.static('./public'))

    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
}

function createRoutes() {
    app.use('/getToken', tokenRouter)
    app.use('/cards', cardsRouter)
}