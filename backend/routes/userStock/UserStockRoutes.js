const router = require('express').Router();
const userStocksController = require("../../controllers/buyStock/BuyStockController");

router.post('/buy', userStocksController.buy_stock);
router.post('/sell', userStocksController.sell_stock);
router.get('/all',userStocksController.get_positions_by_userId);
router.delete('/remove',userStocksController.remove_watchlist_scrip);

module.exports = router;