const express = require('express');
const app = express();
app.use(express.json());

const selectAllCategories = require('./controllers/category-controller.js');


app.get('/api', (req, res) => {
    return res.send({
        message : "all ok"
    });
});

app.get('/api/categories', selectAllCategories);

app.get((error, request, response, next) => {
    console.log(error);
    response.status(500).send({msg: 'Server Error'})
})

module.exports = app;