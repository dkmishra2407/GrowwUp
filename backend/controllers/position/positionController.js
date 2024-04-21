// const Position = require("../../models/Position");

// module.exports.get_positions_by_userId = async (req, res) => {
//     const { userId } =   req.query;
//     try {
//         const positions = await Position.find({userId: userId} )
//                 .populate([
//                     {
//                         path: 'buyOrderId',
//                         populate: {
//                             path: 'scripId'
//                         }
//                     },
//                     {
//                         path: 'sellOrderId',
//                         populate: {
//                             path: 'scripId'
//                         }
//                     }
//                 ]);
//         return res.status(200).json({
//             positions: positions
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: 'Internal server error',
//             err: err
//         });
//     }
// }

const Position = require("../../models/Position");

module.exports.get_positions_by_userId = async (req, res) => {
    const { userId } = req.query;
    try {
        const positions = await Position.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $group: {
                    _id: "$stockName",
                    totalQuantity: { $sum: "$quantity" },
                    totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    stockName: "$_id",
                    totalQuantity: 1,
                    averagePrice: { $divide: ["$totalPrice", "$totalQuantity"] }
                }
            }
        ]);

        console.log(positions);

        if (positions.length === 0) {
            return res.status(404).json({ message: 'No positions found for the specified user.' });
        }

        return res.status(200).json({ positions: positions });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error', err: err });
    }
}
