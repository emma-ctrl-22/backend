const router = require('express').Router();
const User = require('../../models/User');
const Request = require('../../models/Request');

const {getDriversCount} = require('../../controllers/driverController');

router.post('/', getDriversCount);



module.exports = router;