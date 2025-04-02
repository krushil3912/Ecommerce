const mongoose = require('mongoose');
let Schema = mongoose.Schema

const paymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending','running', 'Success'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date,
        require:[true,Date.now]
    }
});

PAYMENT = mongoose.model('payment', paymentSchema);
module.exports = PAYMENT