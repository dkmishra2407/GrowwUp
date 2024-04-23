const mongoose = require('mongoose');

const OrderModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderType: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    priceType: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    profit:{
        type: Number
    }
},{
    timestamps : true
})


module.exports = mongoose.model('Order', OrderModel)

