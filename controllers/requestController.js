const Request = require('../models/Request');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const createRequest = async (req, res) => {
    console.log('createRequest controller called');
    console.log('Request body:', req.body);
    
    try {
        // Explicitly extract all fields from the request body
        const { type, status, lat, long, author, userId } = req.body;
        
        console.log('Creating new request with data:', {
            type,
            status,
            lat,
            long,
            author,
            userId
        });
        
        // Create the request with explicit field assignments
        const newRequest = new Request({
            type: type || "Plastic",
            status: status || "Pending",
            lat: lat,
            long: long,
            author: author, // Make sure this is explicitly assigned
            userId: userId, // Make sure this is explicitly assigned
            TakenBy: "anyone" // Set default value
        });
        
        console.log('Request model instance created:', newRequest);
        
        // Save the request to the database
        const request = await newRequest.save();
        console.log('Request saved successfully:', request);
        
        res.status(200).json(request);
    } catch (err) {
        console.error('Error in createRequest:', err);
        console.error('Error details:', err.message);
        
        // Check if it's a validation error
        if (err.name === 'ValidationError') {
            console.error('Validation error details:', err.errors);
        }
        
        // Check if it's a duplicate key error
        if (err.code === 11000) {
            console.error('Duplicate key error details:', err.keyValue);
        }
        
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

// Updated History function to properly fetch requests by email
const History = async (req, res) => {
    console.log('History controller called');
    console.log('Query parameters:', req.query);
    
    try {
        const author = req.query.author;
        
        if (!author) {
            console.error('Author query parameter is missing');
            return res.status(400).json({ message: 'Author query parameter is required' });
        }
        
        console.log('Searching for requests with author:', author);
        
        // Find all requests where the author field matches the provided email
        const requests = await Request.find({ author: author });
        
        console.log('Found requests:', requests);
        console.log('Number of requests found:', requests.length);
        
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error in History controller:', error);
        console.error('Error details:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// New function to get requests by user email
const getRequestsByEmail = async (req, res) => {
    console.log('getRequestsByEmail controller called');
    console.log('Query parameters:', req.query);
    
    try {
        const email = req.query.email;
        
        if (!email) {
            console.error('Email query parameter is missing');
            return res.status(400).json({ message: 'Email query parameter is required' });
        }
        
        console.log('Searching for requests with email:', email);
        
        // Find all requests where the author field matches the provided email
        const requests = await Request.find({ author: email });
        
        console.log('Found requests:', requests);
        console.log('Number of requests found:', requests.length);
        
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error in getRequestsByEmail controller:', error);
        console.error('Error details:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const AssignRequest = async (req, res) => {
    try {
        const { requestId, driverId } = req.body;

        // Find the request by ID
        const request = await Request.findById(requestId);
        console.log(requestId, driverId);
        
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

module.exports = { 
    createRequest, 
    getAllRequests, 
    History, 
    AssignRequest, 
    PlasticRequest, 
    PaperRequest,
    getRequestsByEmail 
};