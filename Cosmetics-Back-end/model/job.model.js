const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('job', jobSchema); 
