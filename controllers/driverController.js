const Request = require('../models/Request');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const getDriversCount = async (req, res) => {
    try {
        const driverCount = await User.countDocuments({ role: "driver" });
        res.status(200).json({ count: driverCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getDriversCount };