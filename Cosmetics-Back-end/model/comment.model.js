const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    start: {
      type: String,
      require: true,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
    createdAt:{
      type: Date,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product', 
    },
  },                    
  {
    timestamps: true, 
    versionKey: false,
  }, 
);
module.exports = mongoose.model('comment', commentSchema); 
