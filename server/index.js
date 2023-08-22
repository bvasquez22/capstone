require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

const {getCart, getProducts, addToCart, signUp} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.get('/cart', getCart);
app.get('/products', getProducts);
app.post('/products', addToCart);
app.post('/subscribers', signUp)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
