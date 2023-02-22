const fetchReviews = require('../models/reviews-model');

function selectAllReviews(request, response, next) {
    fetchReviews()
    .then((reviews)=> {
        return response.status(200).send({reviews})
    }).catch((error)=>{
        next(error);
    })
};


module.exports = selectAllReviews