const mongoose = require('mongoose');

const PositionModel = new mongoose.Schema({
    symbol:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    buyOrderId: {
        type: String,
        ref: "Order"
    },
    sellOrderId: {
        type: String,
        ref: "Order"
    },
    qty: {
        type: Number,
        required: true
    },
    posStatus: {
        type: String,
        required: true
    }
},{
    timestamps : true
})


module.exports = mongoose.model('Position', PositionModel)

