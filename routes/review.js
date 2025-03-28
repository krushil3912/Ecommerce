var express = require('express');
var router = express.Router();
const reviewController = require('../controllers/review')

/* GET home page. */
router.post('/create', reviewController.createReview);
router.get('/findone/:id', reviewController.getReviewById);
router.get('/find', reviewController.getAllReviews);
router.patch('/update/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);
module.exports = router;
