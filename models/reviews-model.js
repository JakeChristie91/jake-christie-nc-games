const db = require('../db/connection.js')

function fetchReviews() {
    return db.query(`SELECT reviews.*,
    COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id
    ORDER BY created_at DESC`).then((response) => {
        return response.rows;
    });
};
function fetchReviewsByID(review_id) { return db.query(`SELECT * FROM reviews
WHERE review_id = $1;`, [review_id]).then((response) => {
    const review = response.rows[0];
    if(!review) {
        return Promise.reject('No user found for review_id')
    }
    return review;
});
}


module.exports = { fetchReviews, fetchReviewsByID }