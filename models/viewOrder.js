const mongoose = require('mongoose');
let Schema = mongoose.Schema

const viewOrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending','running', 'Success'],
        default: 'Pending'
    },
});

VIEWORDER= mongoose.model('viewOrder', viewOrderSchema);
module.exports = VIEWORDER