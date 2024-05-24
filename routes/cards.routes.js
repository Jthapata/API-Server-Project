const express = require('express')
const { expressjwt } = require('express-jwt')
const dotenv = require('dotenv')
const fs = require('fs')

const cardsRouter = express.Router()
let { cards } = require('../data/cards.json')
dotenv.config()
const secret = process.env.secret

cardsRouter.get('/', (req, res) => {
    const { id, name, set, cardNumber, type, power, toughness, rarity, cost } = req.query
    const filteredCards = cards.filter(card => {
        return (id ? card.id === id : true) &&
            (name ? card.name === name : true) &&
            (set ? card.set === set : true) &&
            (cardNumber ? card.cardNumber === cardNumber : true) &&
            (type ? card.type === type : true) &&
            (power ? card.power === power : true) &&
            (toughness ? card.toughness === toughness : true) &&
            (rarity ? card.rarity === rarity : true) &&
            (cost ? card.cost === cost : true)
    })
    res.send(filteredCards)
})

cardsRouter.post('/create',
    expressjwt({ secret: secret, algorithms: ['HS256'] }),
    (req, res) => {
        const { name, set, type, power, toughness, rarity, cost } = req.body
        if (!name || !set || !type || !rarity || !cost) {
            return res.status(500).json({ errorMessage: "Insufficient amount of parameters" })
        }
        if (type !== "Spell") {
            if (!power || !toughness) {
                return res.status(500).json({ errorMessage: "Power and toughness are required for non-Spell cards" });
            }
        }
        const id = cards[cards.length - 1].id + 1
        const cardNumber = cards[cards.length - 1].cardNumber + 1
        cards.push({
            "id": id,
            "name": name,
            "set": set,
            "cardNumber": cardNumber,
            "type": type,
            "power": power,
            "toughness": toughness,
            "rarity": rarity,
            "cost": cost
        })
        const newObject = {}
        newObject.cards = cards
        const file = fs.createWriteStream('./data/cards.json')
        file.write(JSON.stringify(newObject))
        res.send("Successfully Created Card")
})

cardsRouter.put('/:id',
    expressjwt({ secret: secret, algorithms: ['HS256'] }),
    (req, res) => {
        const id = Number(req.params.id)
        const { name, set, type, power, toughness, rarity, cost } = req.body
        if (!name || !set || !type || !rarity || !cost) {
            return res.status(500).json({ errorMessage: "Insufficient amount of parameters" })
        }
        if (type !== "Spell") {
            if (!power || !toughness) {
                return res.status(500).json({ errorMessage: "Power and toughness are required for non-Spell cards" });
            }
        }
        cards.forEach((card) => {
            if (card.id === id) {
                card.name = name ? name : null
                card.set = set ? set : null
                card.type = type ? type : null
                card.power = power ? power : null
                card.toughness = toughness ? toughness : null
                card.rarity = rarity ? rarity : null
                card.cost = cost ? cost : null
            }
        })
        const newObject = {}
        newObject.cards = cards
        const file = fs.createWriteStream('./data/cards.json')
        file.write(JSON.stringify(newObject))
        res.send('Successfully Updated card')
    }
)

//create route to delete cards

module.exports = cardsRouter