const mongoose = require('mongoose');
let Schema =mongoose.Schema

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Success'],
        default: 'Pending'
    },
    shippingAddress: {
        type: String,
        required: true
    },
});


ORDER = mongoose.model('order', orderSchema);
module.exports = ORDER