 const mongoose = require('mongoose');

 const plm = require('passport-local-mongoose');
const user = new mongoose.Schema({
   username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    issuedbook: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }]


    

 },{timestamps: true})


 user.plugin(plm)
 module.exports = mongoose.model("user",user)