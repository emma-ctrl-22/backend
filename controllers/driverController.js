const Request = require('../models/Request');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const getDrivers = async (req, res) => {
    try {
        // Extract comAssociate from request body
        const { comAssociate } = req.body;

        // Find drivers that match the role and comAssociate
        const drivers = await User.find({ 
            role: "driver",
            comAssociate: comAssociate  // Assuming comAssociate is a field in your User model
        });

        res.status(200).json(drivers);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { getDrivers };