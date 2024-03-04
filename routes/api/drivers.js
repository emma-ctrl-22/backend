const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Request = require('../../models/Request');

const { getDrivers,StatusChanger ,getAllCompanies,getAssignHauls} = require('../../controllers/driverController');
 
router.post('/', getDrivers);

router.post('/status', StatusChanger);

router.get('/companies', getAllCompanies);

router.post('/assignHauls', getAssignHauls);

module.exports = router;