const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
});
module.exports = mongoose.model('categories', categorySchema); 
