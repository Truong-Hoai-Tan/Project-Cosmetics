const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    account: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'account'
    },
    isOrder: {
        type: Number,
        enum: [0, 1], //0: chưa order, 1: đã order
        default: 0
    },
    items: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: false
})

module.exports = mongoose.model("cart", cartSchema);