const mongoose = require('mongoose');


const transaction = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },

    status:{
        type: String,
        default: "issued"
    },
    totalRent:{
        type: Number
    },

    issuedate:{ 
        type: Date,
        default: Date.now
    },

    returndate:{
        type: Date
    }

},{timestamps: true})


module.exports = mongoose.model("transaction",transaction)