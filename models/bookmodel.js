const mongoose = require('mongoose');

const book = new mongoose.Schema({
   
   
    bookName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },
 

},{timestamps: true})

module.exports = mongoose.model("book",book)