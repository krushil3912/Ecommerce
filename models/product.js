const mongoose = require('mongoose');
let Schema = mongoose.Schema

const productSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productName: {
        type: String,
        trime : true,
        required : [true,'Please Enter product Name']
    },
    price: {
        type: Number,
        required: true
    },
    stock:
    {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: [String],
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
});

PRODUCT = mongoose.model('product', productSchema);
module.exports = PRODUCT