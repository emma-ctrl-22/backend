const Request = require('../models/Request');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const createRequest = async (req, res) => {
    try {
        const newRequest = new Request({
            type: req.body.type,
            status: req.body.status,
            lat: req.body.lat,
            long: req.body.long,
            author:req.body.author,
            userId: req.body.userId,
        });

        const request = await newRequest.save();
        res.status(200).json(request);
    } catch (err) {
        console.error(err); // Log the error to see more details
    res.status(500).json({ message: err.message });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
}

const PlasticRequest = async (req, res) => {
    try {
        const requests = await Request.find({ type: "Plastic" });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
};

const PaperRequest = async (req, res) => {
    try {
        const requests = await Request.find({ type: "Paper" });
        res.status(200).json(requests);
        } catch (err) {
        res.status(500).json(err);
    }
}

const History = async (req,res) =>{
    try {
        const author = req.query.author;
        if (!author) {
            return res.status(400).json({ message: 'Author query parameter is required' });
        }

        const requests = await Request.find({ author: author });
        res.status(200).json(requests);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

const AssignRequest = async (req, res) => {
    try {
        const { requestId, driverId } = req.body;

        // Find the request by ID
        const request = await Request.findById(requestId);
     console.log(requestId,driverId);
        // Check if the request exists
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update the takenBy field with the driverId
        request.TakenBy = driverId;

        // Save the updated request
        await request.save();

        console.log(request);

        // Return a success response
        res.status(200).json({ message: 'Request assigned successfully', request });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}



module.exports = { createRequest, getAllRequests,History ,AssignRequest};