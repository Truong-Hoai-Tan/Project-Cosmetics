const mongoose = require('mongoose');

const categoryBigSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    link: {
        type: String,
    },
});
module.exports = mongoose.model('categorybigs', categoryBigSchema); 
