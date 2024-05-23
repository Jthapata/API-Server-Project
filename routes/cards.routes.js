const express = require('express')
const {expressjwt} = require('express-jwt')
const dotenv = require('dotenv')

const cardsRouter = express.Router()
const { cards } = require('../data/cards.json')
dotenv.config()
const secret = process.env.secret

cardsRouter.get('/', (req, res) => {
    // use the parameters if they exist, need to add more checks
    const { set } = req.query
    console.log(set)
    res.send(cards)
})

module.exports = cardsRouter