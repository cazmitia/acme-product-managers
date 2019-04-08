const express = require('express');
const app = express();
const path = require('path');
const { Product, Manager, initDb } = require('./db')

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next) => {
    Product.findAll({ 
        attributes: ['id', 'name', 'managerId'],
        order: [['id', 'ASC']]
    })
        .then(products => res.send(products))
        .catch(next)
})

app.get('/api/managers', (req, res, next) => {
    Manager.findAll({ attributes: ['id', 'name'] })
        .then(managers => res.send(managers))
        .catch(next)
})

app.put('/api/products/:id', (req, res, next) => {
    console.log(req.body)
    Product.findByPk(req.params.id)
        .then(product => product.update({ managerId: req.body.newManagerId }))
        .then(product => res.send(product))
        .catch(next)
})

app.listen(port, () => console.log(`listening on port ${port}`))
initDb(true)
