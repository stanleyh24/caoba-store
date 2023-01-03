const express = require('express');
const categoriesRouter = express.Router();

categoriesRouter
    .get('/', (req, res) => {
        res.send("Get all categories");
    })
    .get('/:productId', (req, res) => {
        res.send("Get all categories");
    })
    .post('/', (req, res) => {
        res.send("create a new categories");
    })
    .patch('/:productId', (req, res) => {
        res.send("Update a categories");
    })
    .delete('/:productId', (req, res) => {
        res.send("delete a categories");
    })
    

module.exports = categoriesRouter;