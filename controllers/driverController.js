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
};

const StatusChanger = async (req, res) => {
    const requestId = req.body.requestId;
    const comAssociate = req.body.comAssociate

    try {
        // Find the request by _id and update its status
        const updatedRequest = await Request.findOneAndUpdate(
            { _id: requestId },
            { 
                status: 'completed',
                TakenBy: comAssociate // Update the takenBy field
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const companies = await User.find({ role: 'admin' });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getDrivers , StatusChanger,getAllCompanies };