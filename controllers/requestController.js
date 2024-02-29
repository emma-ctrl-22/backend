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
            author:req.body.author
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




module.exports = { createRequest, getAllRequests,History };