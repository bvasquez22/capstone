require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let cart = {
    cartCount: 0,
    cartTotal: 0.00,
}

module.exports = {
    getCart: (req, res) => {
        console.log(cart);
        res.status(200).send(cart);
    },
    
    getProducts: (req, res) => {
        sequelize.query(`
            select * from products
            `).then(dbRes => {
                res.status(200).send(dbRes[0]);
            }).catch(err => {
                console.log(err);
            })
    },

    addToCart: (req, res) => {
        console.log(req.body);
        cart.cartCount += req.body.quantity;
        cart.cartTotal += parseFloat(req.body.price.replace('$', ''))
        console.log(cart)
        res.status(200).send('Item added to cart.');
    },

    signUp: (req, res) => {
        sequelize.query(`
            insert into subscribers (name, email)
            values ('${req.body.name}', '${req.body.email}')
        `).then(dbRes => {
            res.status(200).send(dbRes[0])
        }).catch(err => {
            console.log(err)
        })
    },
}