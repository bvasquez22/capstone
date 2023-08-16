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

module.exports = {
    getProducts: (req, res) => {
        sequelize.query(`
            select * from products
            `).then(dbRes => {
                res.status(200).send(dbRes[0])
            }).catch(err => {
                console.log(err)
            })
    }
}