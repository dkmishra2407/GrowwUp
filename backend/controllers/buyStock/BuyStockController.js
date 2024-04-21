const Order = require("../../models/Order");
const User = require("../../models/User");
const Scrip = require("../../models/Scrip");
const Position = require("../../models/Position");
const mongoose = require("mongoose");

module.exports.buy_stock = async (req, res) => {
try{
        const { orderType, priceType, productType, qty, price, userId , symbol } = req.body;
        const avgPrice = parseFloat(price);
    
        // // Validate the price
        // if (avgPrice % 0.05 !== 0) {
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Invalid price. Price must be a multiple of 0.05."
        //     });
        // }
    
        const user = await User.findById("661e6d453e3da0b8f29d040e");
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
        const margin = leverage * user.availableFunds;
        if (margin < avgPrice * qty) {
            await Order.findByIdAndUpdate(savedOrder._id, { orderStatus: 'Rejected' });
            return res.status(400).json({
                status: 400,
                message: "Insufficient fund"
            });
        }
    
        user.availableFunds -= (qty * avgPrice) / leverage;
        await user.save();
    
        const newPosition = new Position({
            symbol,
            price,
            userId,
            buyOrderId: savedOrder._id,
            sellOrderId: savedOrder._id,
            qty,
            posStatus: 'Active'
        });

        // console.log(newPosition);
    
        await newPosition.save();
    
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
        const { orderType, priceType, productType, qty, price, userId , symbol } = req.body;
        console.log(req.body);
        const avgPrice = parseFloat(price);
    
        // // Validate the price
        // if (avgPrice % 0.05 !== 0) {
        //     return res.status(400).json({
        //         status: 400,
        //         message: "Invalid price. Price must be a multiple of 0.05."
        //     });
        // }
    
        const user = await User.findById("661e6d453e3da0b8f29d040e");
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found."
            });
        }

        console.log(user);
    
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
        
    
        user.availableFunds += (qty * avgPrice);
        await user.save();
    
        const newPosition = new Position({
            userId,
            buyOrderId: savedOrder._id,
            sellOrderId: savedOrder._id,
            qty,
            posStatus: 'Active'
        });

    
        await newPosition.save();
    
        return res.status(200).json({
            success: true,
            data: {
                message: 'Sell order placed successfully!!',
                order: savedOrder, // Include the saved order information in the response
                user: user // Include updated user information in the response
            }
        });
    } catch (err) {
        console.error('Error creating sell order:', err);
        res.status(500).json({
            status: 500,
            message: 'Error creating sell order. Please try again.'
        });
    }
};



