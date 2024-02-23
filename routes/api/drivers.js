const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Request = require('../../models/Request');

const { getDrivers,StatusChanger } = require('../../controllers/driverController');
 
router.post('/', getDrivers);

router.post('/status', StatusChanger);

module.exports = router;