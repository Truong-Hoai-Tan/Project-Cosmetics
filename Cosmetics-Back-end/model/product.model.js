const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    product_hot: {
      type: Number,
      required: true,
      default: 0
    },
    createdAt:{
      type: Date,
      
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category',
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('product', productSchema);
