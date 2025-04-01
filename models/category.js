const mongoose = require('mongoose');
let Schema = mongoose.Schema

const categorySchema = new Schema({
    Category: {
        type: String,
        enum: ['food', 'healthWellness','electronics','homeFurniture','sports','clothing','beautySkincare','accessories','shoes'],
        required: [true,'food , healthWellness , electronics , homeFurniture , clothing , beautySkincare , accessories , shoes ']
    }
});

CATEGORY = mongoose.model('category', categorySchema);
module.exports = CATEGORY