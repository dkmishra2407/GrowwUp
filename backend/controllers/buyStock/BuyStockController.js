
// const Order = require("../../models/Order");
// const mongoose = require("mongoose");
// const User = require("../../models/User");
// const Scrip = require("../../models/Scrip");
// const Position = require("../../models/Position");
// const ObjectId = mongoose.Types.ObjectId;

// module.exports.buy_stock = async (req, res) => {
//     try {
//         const {
//             // stockId,
//             orderType,
//             priceType,
//             productType,
//             qty,
//             price,
//             userId,
//             stockPrice
//         } = req.body;

//         let avgPrice = parseFloat(price);

//         let validPrice = (avgPrice * 100) % 5;
//         if (validPrice) {
//             return res.status(400).json({
//                 status: 400,
//                 message: "Invalid price"
//             });
//         }

//         const user = await User.findOne({ _id: ObjectId(userId) });
//         let leverage = 5;
//         let margin = leverage * user.availableFunds;

//         const scrip = await Scrip.findOne({ _id: stockId });
//         avgPrice = avgPrice === 0 ? stockPrice : avgPrice;

//         const userOrder = new Order({
//             userId: userId,
//             // scripId: stockId,
//             qty: qty,
//             price: avgPrice,
//             orderType: orderType,
//             productType: productType,
//             priceType: priceType,
//             orderStatus: priceType.toLowerCase() === 'market' ? 'Executed' : 'Pending',
//             isAvgPrice: avgPrice >= stockPrice ? 'Greater' : 'Less'
//         });
//         const order = await userOrder.save();

//         if (margin < avgPrice * qty) {
//             await Order.findOne({ _id: order._id }, { orderStatus: 'Rejected' });
//             return res.status(400).json({
//                 status: 400,
//                 message: "Insufficient fund"
//             });
//         }

//         await User.findOneAndUpdate({ _id: userId }, {
//             availableFunds: user.availableFunds - ((qty * avgPrice) / leverage)
//         });

//         const newPosition = new Position({
//             userId: userId,
//             buyOrderId: order._id,
//             sellOrderId: order._id,
//             qty: qty,
//             posStatus: 'Active'
//         });

//         await newPosition.save();

//         return res.status(200).json({
//             success: true,
//             data: {
//                 message: 'Buy order placed successfully!!'
//             }
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             status: 500,
//             messages: err.message
//         })
//     }
// }

// module.exports.sell_stock = async (req, res) => {
//     try {
//         const {
//             orderType,
//             priceType,
//             productType,
//             qty,
//             price,
//             userId,
//             stockPrice
//         } = req.body;

//         let avgPrice = parseFloat(price);

//         let validPrice = (avgPrice * 100) % 5;
//         if (validPrice) {
//             return res.status(400).json({
//                 status: 400,
//                 message: "Invalid price"
//             });
//         }

//         const user = await User.findOne({ _id: ObjectId(userId) });

//         let leverage = 5;
//         let margin = leverage * user.availableFunds;
//         avgPrice = avgPrice === 0 ? stockPrice : avgPrice;

//         const userOrder = new Order({
//             userId: userId,
//             // scripId: stockId,
//             qty: qty,
//             price: avgPrice,
//             orderType: orderType,
//             productType: productType,
//             priceType: priceType,
//             orderStatus: priceType.toLowerCase() === 'market' ? 'Executed' : 'Pending',
//             isAvgPrice: avgPrice >= stockPrice ? 'Greater' : 'Less'
//         });
//         const order = await userOrder.save();

//         if (margin < avgPrice * qty) {
//             await Order.findOne({ _id: order._id }, { orderStatus: 'Rejected' });
//             return res.status(400).json({
//                 status: 400,
//                 message: "Insufficient fund"
//             });
//         }

//         await User.findOneAndUpdate({ _id: userId }, {
//             availableFunds: user.availableFunds - ((qty * avgPrice) / leverage)
//         });

//         const newPosition = new Position({
//             userId: userId,
//             buyOrderId: order._id,
//             sellOrderId: order._id,
//             qty: qty,
//             posStatus: 'Active'
//         });

//         await newPosition.save();

//         return res.status(200).json({
//             success: true,
//             data: {
//                 message: 'Sell order placed successfully!!'
//             }
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             status: 500,
//             messages: err.message
//         })
//     }
//}


const Order = require("../../models/Order");
const User = require("../../models/User");
const Scrip = require("../../models/Scrip");
const Position = require("../../models/Position");
const mongoose = require("mongoose");

module.exports.buy_stock = async (req, res) => {
    try {
        const { orderType, priceType, productType, qty, price, userId } = req.body;
        const avgPrice = parseFloat(price);

        // Validate the price
        if (avgPrice % 0.05 !== 0) {
            return res.status(400).json({
                status: 400,
                message: "Invalid price. Price must be a multiple of 0.05."
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found."
            });
        }

        const orderStatus = priceType.toLowerCase() === 'market' ? 'Executed' : 'Pending';
        const isAvgPrice = avgPrice >= stockPrice ? 'Greater' : 'Less';

        const newOrder = new Order({
            userId,
            qty,
            price: avgPrice,
            orderType,
            productType,
            priceType,
            orderStatus,
            isAvgPrice
        });

        const savedOrder = await newOrder.save();

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
                message: 'Buy order placed successfully!!'
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
        // Similar logic as buy_stock function with appropriate changes for selling
        // Implement the logic for selling stocks here
    } catch (err) {
        console.error('Error creating sell order:', err);
        res.status(500).json({
            status: 500,
            message: 'Error creating sell order. Please try again.'
        });
    }
};



// const express = require('express');
// const router = express.Router();
// const Order = require('../../models/Order');

// module.exports.buy_stock = async (req, res) => {
//   try {
//     const {
//       userId,
//       scripId,
//       qty,
//       price,
//       isAvgPrice,
//       orderType,
//       productType,
//       priceType,
//       orderStatus,
//       isExitOrder,
//     } = req.body;

//     // Create a new order using the Order model
//     const newOrder = new Order({
//       userId,
//       scripId,
//       qty,
//       price,
//       isAvgPrice,
//       orderType,
//       productType,
//       priceType,
//       orderStatus,
//       isExitOrder,
//     });

//     // Save the new order to the database
//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       success: true,
//       data: savedOrder,
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating order. Please try again.',
//     });
//   }
// };

// module.exports = router;
