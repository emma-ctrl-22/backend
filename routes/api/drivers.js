const router = require('express').Router();
const User = require('../../models/User');
const Request = require('../../models/Request');

const {getDrivers} = require('../../controllers/driverController');

router.get('/', getDrivers);



module.exports = router;