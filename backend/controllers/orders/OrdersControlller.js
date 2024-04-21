const Order = require("../../models/Order");
const mongoose = require('mongoose');

module.exports.get_user_orders = async (req, res) => {
    const { userId, status } = req.query;

    try {
        console.log("userId ", userId, status);
        const orders = await Order.find({ 
            userId: 'naBsR0p2vW', 
            // orderStatus: status.toLowerCase() === 'open' ? ['Pending'] : ['Executed','Rejected']  
        });
        console.log("orders ", orders);
        
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