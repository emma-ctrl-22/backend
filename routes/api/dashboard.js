const router = require('express').Router();
const { getDashboardStats } = require('../../controllers/dashboardController');

// Route to get all dashboard statistics
router.get('/stats', getDashboardStats);

module.exports = router; 