exports.handlePSQL400s = (error, request, response, next) => {
    if (error.code === '22P02') {
        response.status(400).send({msg: 'Bad Request'});
    }
};

exports.handle500Status = (error, request, response, next) => {
    if (error.code === 500) {
    response.status(500).send({msg: 'Server Error'})
    }
}