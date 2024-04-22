// const Scrip = require("../../models/Scrip");
// const Watchlist = require("../../models/Watchlist");
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;


// async function getQuotes(scrip) {
//     let quotes = new fyers.quotes()
//     let result = await quotes
//         .setSymbol(`NSE:${scrip}-EQ`)
//         .getQuotes();
//    return result;
// }

// module.exports.add_script_in_watchlist = async (req, res) => {
//     // const { userId, scriptId } = req.body;
//     //  const watchlistScript = new Watchlist({
//     //     userId,
//     //     scriptId: savedOrder._id,
//     //     scriptName: savedOrder.symbol, // Adjust as per your schema
//     //     price: savedOrder.price, // Adjust as per your schema
//     // });

//     // await watchlistScript.save();

//     // console.log(req.body);

//     const {name , data} = req.body;
//     const user = await User.findById("661e6d453e3da0b8f29d040e");
//         if (!user) {
//             return res.status(400).json({
//                 status: 400,
//                 message: "User not found."
//             });
//         }

//         const newStock = new Watchlist({
//             name,
//             data.basePrice,
//             data.change,
//             data.lastPrice,
//             data.pChange,
//             data.open,
//             data.vwap,
//             data.upperCP,
//         });


//         const savedOrder = await newStock.save();
//         console.log(savedOrder);

//     try {
//         const script = await Scrip.findOne({ _id: ObjectId(scriptId) });

//         const stock = await getQuotes(script.symbol);
//         console.log(stock);

//         stock?.d && await Scrip.findOneAndUpdate({  _id: ObjectId(scriptId) },{
//             // cmd: stock.d[0].v.cmd,
//             changeInPrice: stock.d[0].change,
//             percentageChange: stock.d[0].pChange,
//             lastPrice: stock.d[0].lastPrice,
//             // spread: stock.d[0].v.spread,
//             // ask: stock.d[0].v.ask,
//             // bid: stock.d[0].v.bid,
//             open: stock.d[0].lastPrice,
//             high: stock.d[0].weekHighLow.max,
//             low: stock.d[0].weekHighLow.min,
//             close: stock.d[0].previousClose,
//             // volume: stock.d[0].v.volume,
//             // shortName: stock.d[0].v.short_name,
//             // exchange: stock.d[0].v.exchange,
//             // description: stock.d[0].v.description,
//             // originalName: stock.d[0].v.original_name,
//             // tt: stock.d[0].v.tt,
//         });

//         const existingUserScript = await Watchlist.findOne({ userId: userId, scriptId: scriptId });
//         if (existingUserScript) return res.status(400).json({ status: 400, message: "This scrip already added to your watchlist" });

//         const watchlistScript = new Watchlist({
//             userId,
//             scriptId: scriptId,
//             scriptName: script.scriptName,
//             price: 3012
//         });
//         await watchlistScript.save();
//         return res.status(200).json({
//             status: 200,
//             message: "Script added successfully to watchlist",
//             data: watchlistScript
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             status: 500,
//             message: err.message
//         })
//    }
//}

const Watchlist = require("../../models/Watchlist");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../../models/User"); // Adjust the path based on your project structure

// Your existing code for the add_script_in_watchlist function


// module.exports.add_script_in_watchlist = async (req, res) => {
    // try {
    //     const { name, data } = req.body;

    //     // Check if user exists (you need to import User model and define User.findById)
    //     const user = await User.findById("661e6d453e3da0b8f29d040e");
    //     if (!user) {
    //         return res.status(400).json({
    //             status: 400,
    //             message: "User not found."
    //         });
    //     }

    //     // Create a new stock object based on the Watchlist schema
    //     const newStock = new Watchlist({
    //         name,
    //         basePrice: data.basePrice,
    //         change: data.change,
    //         lastPrice: data.lastPrice,
    //         pChange: data.pChange,
    //         open: data.open,
    //         vwap: data.vwap,
    //         upperCP: data.upperCP,
    //         // Add more properties as needed
    //     });

    //     // Save the new stock to the database
    //     const savedStock = await newStock.save();
    //     console.log(savedStock);

    //     return res.status(200).json({
    //         status: 200,
    //         message: "Stock added to watchlist successfully",
    //         data: savedStock
    //     });
    // } catch (err) {
    //     console.error("Error adding stock to watchlist:", err);
    //     return res.status(500).json({
    //         status: 500,
    //         message: "Internal server error"
    //     });
    // }

    // module.exports.add_script_in_watchlist = async (req, res) => {
    //     const { stocks: { name, data: { basePrice, change, lastPrice, pChange, open, vwap, upperCP } } } = req.body;
    //     // if (!data || typeof data !== 'object') {
    //     //     return res.status(400).json({
    //     //         status: 400,
    //     //         message: "Invalid data format. Data object is missing or not in the correct format."
    //     //     });
    //     // }
    
    //     // // Check if data object has the required properties
    //     // if (!data.basePrice || !data.change || !data.lastPrice || !data.pChange || !data.open || !data.vwap || !data.upperCP) {
    //     //     return res.status(400).json({
    //     //         status: 400,
    //     //         message: "Missing required properties in data object."
    //     //     });
    //     // }
    
    //     try {
    //         const newStock = new Watchlist({
    //              name,
    //             basePrice: data.basePrice,
    //             change: data.change,
    //             lastPrice: data.lastPrice,
    //             pChange: data.pChange,
    //             open: data.open,
    //             vwap: data.vwap,
    //             upperCP: data.upperCP,
    //         });
    
    //         const savedStock = await newStock.save();
    //         console.log(savedStock);
    
    //         return res.status(200).json({
    //             status: 200,
    //             message: "Stock added successfully to watchlist.",
    //             data: savedStock
    //         });
    //     } catch (err) {
    //         console.error('Error adding stock to watchlist:', err);
    //         return res.status(500).json({
    //             status: 500,
    //             message: "Error adding stock to watchlist. Please try again."
    //         });
    //     }
    // };
    
    module.exports.add_script_in_watchlist = async (req, res) => {
        // const { stocks: { name, data: { basePrice, change, lastPrice, pChange, open, vwap, upperCP, weekHighLow: { min, max}} } } = req.body;
        
        // try {
        //     const newStock = new Watchlist({
        //         userId:"naBsR0p2vW",
        //         name,
        //         basePrice,
        //         change,
        //         lastPrice,
        //         pChange,
        //         open,
        //         vwap,
        //         upperCP,
        //         min,
        //         max
        //     });
        
        //     const savedStock = await newStock.save();
        //     console.log(savedStock);
        
        //     return res.status(200).json({
        //         status: 200,
        //         message: "Stock added successfully to watchlist.",
        //         data: savedStock
        //     });
        // } catch (err) {
        //     console.error('Error adding stock to watchlist:', err);
        //     return res.status(500).json({
        //         status: 500,
        //         message: "Error adding stock to watchlist. Please try again."
        //     });
        // }

        const { userId , stocks: { name, data: { basePrice, change, lastPrice, pChange, open, vwap, upperCP, weekHighLow: { min, max}} } } = req.body;
        console.log(userId);
try {
    // Check if a stock with the same name already exists
    const existingStock = await Watchlist.findOne({ name: name, userId:userId });

    if (existingStock) {
        return res.status(400).json({
            status: 400,
            message: "Stock with this name already exists in the watchlist."
        });
    }
    
    // Create a new stock entry if it doesn't already exist
    const newStock = new Watchlist({
        userId,
        name,
        basePrice,
        change,
        lastPrice,
        pChange,
        open,
        vwap,
        upperCP,
        min,
        max
    });

    const savedStock = await newStock.save();
    console.log(savedStock);

    return res.status(200).json({
        status: 200,
        message: "Stock added successfully to watchlist.",
        data: savedStock
    });
} catch (err) {
    console.error('Error adding stock to watchlist:', err);
    return res.status(500).json({
        status: 500,
        message: "Error adding stock to watchlist. Please try again."
    });
}

    };
    

module.exports.get_watchlist_by_userId = async (req, res) => {
   

    const { userId, status } = req.query;
    
    try {
        console.log("userId ", userId, status);
        const watching_stocks = await Watchlist.find({ 
            userId: userId, 
        });
        console.log("Watchlist ", watching_stocks);
        
        return res.status(200).json({
            message: 'success',
            watching_stocks: watching_stocks
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
        const { userId , deleting_name } = req.query;

        console.log(deleting_name);

        const existingDoc = await Watchlist.findOne({ userId:userId , name: deleting_name });
        if (!existingDoc) {
            return res.status(404).json({
                status: 404,
                message: "Watchlist not found for deletion"
            });
        }

        // Delete the document using findOneAndDelete and await the operation
        await Watchlist.findOneAndDelete({ userId:userId , name: deleting_name });

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