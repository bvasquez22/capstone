require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env

const {getProducts} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.get('/products', getProducts);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
