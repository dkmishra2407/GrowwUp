const authRoutes = require('./authentication/AuthenticationRoutes');
const watchlistRoutes = require('./watchlist/watchlistRoutes');
const userStockRoutes = require('./userStock/UserStockRoutes');
const orderRoutes = require('./order/orderRoutes');
const positionRoutes = require('./position/PositionRoutes.js');
const express = require('express');
const router = express.Router();

router.use('/api/user', authRoutes);
router.use('/api/watchlist', watchlistRoutes);
router.use('/api/stock', userStockRoutes);
router.use('/api/order', orderRoutes);
router.use('/api/position', positionRoutes);

module.exports = router;