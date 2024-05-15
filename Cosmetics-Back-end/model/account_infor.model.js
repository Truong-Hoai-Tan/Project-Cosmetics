const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const account_inforSchema = mongoose.Schema(
    {
        customer_name: {
          type: String,
          require: true,
        },
        address: {
          type: String,
          require: true,
        },
        phone: {
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



module.exports = mongoose.model('account_infor', account_inforSchema);
