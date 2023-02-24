const fs = require('fs/promises');
const reviews = require('../db/data/test-data/reviews');
const { fetchReviews, fetchReviewsByID } = require('../models/reviews-model');

function selectAllReviews(request, response, next) {
    fetchReviews()
    .then((reviews)=> {
        return response.status(200).send({reviews})
    }).catch((error)=>{
        next(error);
    })
};

function selectReviewById(request, response, next) { 
    
    const { review_id } = request.params;
        fetchReviewsByID(review_id).then((review) => {
        response.status(200).send({review});
    }).catch((error)=>{
        next(error);
    })   
}
    


module.exports = { selectAllReviews, selectReviewById }