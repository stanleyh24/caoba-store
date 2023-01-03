const express = require('express');
const productsrouter = express.Router();

productsrouter
    .get('/', (req, res) => {
        res.send("Get all products");
    })
    .get('/:productId', (req, res) => {
        res.send("Get all products");
    })
    .post('/', (req, res) => {
        res.send("create a new products");
    })
    .patch('/:productId', (req, res) => {
        res.send("Update a products");
    })
    .delete('/:productId', (req, res) => {
        res.send("delete a products");
    })
    

module.exports = productsrouter;