const mongoose = require('mongoose');

const WatchlistModel = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    basePrice:{
        type: Number,
        required: true
    },
    change:{
        type: Number,
        required: true
    },
    lastPrice:{
        type: Number,
        required: true
    },
    pChange:{
        type: Number,
        required: true
    },
    open:{
        type: Number,
        required: true
    },
    vwap:{
        type: Number,
        required: true
    },
    upperCP:{
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
},{
    timestamps : true
})


module.exports = mongoose.model('Watchlist', WatchlistModel)

// name,
//             basePrice: data.basePrice,
//             change: data.change,
//             lastPrice: data.lastPrice,
//             pChange: data.pChange,
//             open: data.open,
//             vwap: data.vwap,
//             upperCP: data.upperCP,