const Order = require("../../models/Order");
const User = require("../../models/User");
const Position = require("../../models/Position");
const mongoose = require("mongoose");
const Watchlist = require("../../models/Watchlist");
const axios = require('axios');


module.exports.buy_stock = async (req, res) => {
try{
        const { orderType, priceType, productType, qty, price, userId , symbol } = req.body;
        const avgPrice = parseFloat(price);
    
        // const myuserid = localStorage.getItem('myuserid');
        // console.log(myuserid);
        // // Validate the price
        // if (avgPrice % 0.05 !== 0) {
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Invalid price. Price must be a multiple of 0.05."
        //     });
        // }
    
        // const user = await User.findById("661e6d453e3da0b8f29d040e");
        const user = await User.findOne({userId : userId});
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found."
            });
        }

        // console.log(user);
    
        const orderStatus = priceType.toLowerCase() === 'market' ? 'Executed' : 'Pending';
        // const isAvgPrice = avgPrice >= stockPrice ? 'Greater' : 'Less';
    
        const newOrder = new Order({
            userId,
            orderStatus,
            symbol,
            qty,
            price,
            orderType,
            productType,
            priceType,
        });


        const savedOrder = await newOrder.save();
        // console.log(savedOrder);
    
        // Update user funds
        const leverage = 5;
        const margin =  user.availableFunds;
        if (margin < avgPrice * qty) {
            await Order.findByIdAndUpdate(savedOrder._id, { orderStatus: 'Rejected' });
            return res.status(400).json({
                status: 400,
                message: "Insufficient fund"
            });
        }
    
        user.availableFunds -= (qty * avgPrice);
        await user.save();
    
        // const newPosition = new Position({
        //     symbol,
        //     price,
        //     userId,
        //     buyOrderId: savedOrder._id,
        //     sellOrderId: savedOrder._id,
        //     qty,
        //     posStatus: 'Active'
        // });

        // // console.log(newPosition);
    
        // await newPosition.save();

        const existingPosition = await Position.findOne({ symbol:symbol, userId:userId });
        // console.log("euuu"+existingPosition)

if (existingPosition) {
    const currentQty = parseInt(existingPosition.qty);
const currentPrice = parseFloat(existingPosition.price);
const totalValue = currentQty * currentPrice;

const newTotalValue = totalValue + (parseInt(qty) * parseFloat(price));
const newQty = currentQty + parseInt(qty);
const newPrice = newTotalValue / newQty;

await Position.findOneAndUpdate(
    { symbol, userId },
    { qty: newQty, price: newPrice, posStatus: 'Active' },
    { new: true } // Return the updated document
);

} else {
    // Symbol not found, insert new position
    const newPosition = new Position({
        symbol,
        price,
        userId,
        buyOrderId: savedOrder._id,
        sellOrderId: savedOrder._id,
        qty,
        posStatus: 'Active'
    });

    await newPosition.save();
}

    
        return res.status(200).json({
            success: true,
            data: {
                message: 'Buy order placed successfully!!',
                order: savedOrder, // Include the saved order information in the response
                user: user // Include updated user information in the response
            }
        });
    } catch (err) {
        console.error('Error creating buy order:', err);
        res.status(500).json({
            status: 500,
            message: 'Error creating buy order. Please try again.'
        });
    }
    

};

module.exports.sell_stock = async (req, res) => {
    try {
        const { orderType, priceType, productType, qty, price, userId, symbol } = req.body;
        console.log(req.body);
        const avgPrice = parseFloat(price);

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found."
            });
        }

        // Uncomment this if you need to fetch stock data
        let stockData;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/${symbol}`);
            if (response.status === 200) {
                stockData = response.data;
               // console.log(response.data)
            } else {
                throw new Error('Failed to fetch stock data');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                status: 500,
                message: "Internal server error"
            });
        }
        const totalprofit =(stockData.lastPrice-price)*qty/100
        const newOrder = new Order({
            userId,
            symbol,
            qty,
            price: stockData?.lastPrice, // Use optional chaining if using Node.js 14+
            //price,
            orderType,
            productType,
            priceType,
            profit: totalprofit
        });

        console.log("New Order"+newOrder);
        // Save newOrder to the database
        await newOrder.save();

        const newVal = user.availableFunds + qty * price;
        await User.findOneAndUpdate({ userId }, { $set: { availableFunds: newVal } });

        const existingPosition = await Position.findOne({ symbol:symbol, userId: userId });
        console.log("euuu"+existingPosition)

if (existingPosition) {
    const currentQty = parseInt(existingPosition.qty);
const newQty = currentQty - parseInt(qty);


await Position.findOneAndUpdate(
    { symbol, userId },
    {$set:{ qty: newQty,  posStatus: 'Active' }},
    { new: true } // Return the updated document
);

}

    await newPosition.save();

        console.log("Order placed successfully");
        res.status(200).json({
            message: "Order placed successfully",
        });
    } catch (err) {
        console.error('Order placed successfully', err);
        res.status(500).json({
            message: 'Order placed successfully'
        });
    }
};



module.exports.get_positions_by_userId = async (req, res) => {
    const { userId } = req.query;

    try {
        // console.log("userId ", userId, status);
        const orders = await Position.find({ 
            userId: userId,   
        });
        //console.log("orders ", orders);
        
        return res.status(200).json({
            message: 'success',
            orders: orders
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}


module.exports.remove_watchlist_scrip = async (req, res) => {
    try {
        const { userId , deletingName } = req.query;

        console.log(deletingName);

        console.log(userId)

        const existingDoc = await Watchlist.findOne({ userId:userId , name: deletingName });
        if (!existingDoc) {
            return res.status(404).json({
                status: 404,
                message: "Watchlist not found for deletion"
            });
        }

        // Delete the document using findOneAndDelete and await the operation
        await Watchlist.findOneAndDelete({ userId:userId , name: deletingName });

        return res.status(200).json({
            status: 200,
            message: "Watchlist deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};