const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-product-managers-db')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Manager = db.define('manager', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Manager.hasMany(Product)

const initDb = (force = false) => {
    return db.sync({ force })
        .then(() => Manager.create({ name: 'Moe' }))
        .then(() => Manager.create({ name: 'Larry' }))
        .then(() => Manager.create({ name: 'Curly' }))
        .then(() => Product.create({ name: 'Bar', managerId: 2 }))
        .then(() => Product.create({ name: 'Bazz' }))
        .then(() => Product.create({ name: 'Buzz' }))
}

module.exports = {
    Product,
    Manager,
    initDb
}
