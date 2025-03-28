const REVIEW = require('../models/review')

// Create Review
exports.createReview = async (req, res) => {
    try {

        const createdata = await REVIEW.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "User created successfully !",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

// Get All Reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await REVIEW.find().populate('user').populate('viewOrder');
        res.status(200).json({ 
            status: "Success",
            reviews
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error: error.message 
        });
    }
};

// Get Review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await REVIEW.findById(req.params.id).populate('user').populate('viewOrder');
        if (!review) {
            return res.status(404).json({ 
                status: "Fail",
                message: 'Review not found' 
            });
        }
        res.status(200).json({
            status: "Success",
            review
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error: error.message 
        });
    }
};


exports.updateReview = async (req, res) => {
    try {
        const review = await REVIEW.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }
        res.status(200).json({
            status: "Success",
            message: 'Review updated successfully',
            review
        });
    } catch (error) {
        res.status(400).json({
             status: "Fail",
            error: error.message 
        });
    }
};


exports.deleteReview = async (req, res) => {
    try {
        const review = await REVIEW.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }
        res.status(200).json({
            status: "Success",
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error: error.message
        });
    }
};
