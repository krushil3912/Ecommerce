const mongoose = require('mongoose');
let Schema = mongoose.Schema

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    viewOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'viewOrder',
        required: true
    },
    rating: {

        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Rating value is required']

    },
    comment: {
        type: String
    },
});

REVIEW = mongoose.model('review', reviewSchema);
module.exports = REVIEW