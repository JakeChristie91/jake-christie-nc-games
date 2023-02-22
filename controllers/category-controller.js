
const fetchCategories = require('../models/category-model');

function selectAllCategories(request, response, next) {
    fetchCategories()
    .then((categories)=> {
        return response.status(200).send({categories})
    }).catch((error)=>{
        next(error);
    })
};


module.exports = selectAllCategories