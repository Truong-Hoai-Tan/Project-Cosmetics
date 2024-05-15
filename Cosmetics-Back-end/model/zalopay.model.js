const mongoose = require('mongoose');

const zaloPaySchema = mongoose.Schema(
  {
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'oder',
      require: true,
    },
    app_id: {
      type: String,
      require: true,
    },
    app_user: {
      type: String,
    },
    app_trans_id: {
      type: String,
    },
    app_time: String,
    amount: Number,
    item: String,
    description: String,
    embed_data: String,
    mac: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('zaloPay', zaloPaySchema);
