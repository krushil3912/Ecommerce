const mongoose = require('mongoose');
let Schema = mongoose.Schema

const categorySchema = new Schema({
    subcategories: {
        food: {
            type: [String]
        },
        healthWellness: {
            type: [String]
        },
        electronics: {
            type: [String]
        },
        healthWellness: {
            type: [String]
        },
        homeFurniture: {
            type: [String]
        },
        sports: {
            type: [String]
        },
        booksMedia: {
            type: [String]
        },
        clothing: {
            type: [String]
        },
        beautySkincare: {
            type: [String]
        },
        accessories: {
            type: [String]
        },
        shoes: {
            type: [String]
        },

    }
});

CATEGORY = mongoose.model('category', categorySchema);
module.exports = CATEGORY