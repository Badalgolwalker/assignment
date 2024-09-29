const mongoose = require('mongoose');


exports.connect = () => {
    mongoose.connect(process.env.mongodb_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))


}

