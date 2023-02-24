const express = require('express');
const app = express();
// app.use(express.json()); FOR PATCH AND POST REQUESTS

const selectAllCategories = require('./controllers/category-controller.js');

const { selectAllReviews, selectReviewById }
= require('./controllers/reviews-controller.js');

app.get('/api', (require, response) => {
    return response.status(200).send({
        message : "all ok"
    });
});

app.get('/api/categories', selectAllCategories);

app.get('/api/reviews', selectAllReviews);

app.get('/api/reviews/:review_id', selectReviewById);

app.use((error, request, response, next) => {
    if (error === 'No user found for review_id') {
      response.status(404).send({msg: 'No user found for review_id'});
    } else next(error)
})
app.use((error, request, response, next) => {
    if (error.code === '22P02') {
        response.status(400).send({ msg: 'Invalid input' });
      } else next(error);
})
app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send({ msg : 'Server Error' });
})

app.use('*', (request, response, next) => {
    response.status(404).send({ msg: '404 Path Not Found'})
})


module.exports = app;