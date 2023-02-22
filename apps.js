const express = require('express');
const app = express();
// app.use(express.json()); FOR PATCH AND POST REQUESTS

const selectAllCategories = require('./controllers/category-controller.js');


app.get('/api', (req, res) => {
    return res.status(200).send({
        message : "all ok"
    });
});

app.get('/api/categories', selectAllCategories);

app.use('*', (request, response, next) => {
    response.status(404).send({ msg: '404 Path Not Found'})
})

app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send({ msg : 'Server Error' });
})

module.exports = app;