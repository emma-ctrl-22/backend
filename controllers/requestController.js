const Request = require('../models/Request');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const createRequest = async (req, res) => {
    try {
        const newRequest = new Request({
            username: req.body.username,
            type: req.body.type,
            status: req.body.status,
            lat: req.body.lat,
            long: req.body.long,
            user_id: req.body.user_id
        });

        const request = await newRequest.save();
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
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

const SpecificRequest = async (req, res) => {
    try {
        const userId = req.params.userId; // Access user_id sent as URL parameter
        const requests = await Request.find({ user_id: userId });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = { createRequest, getAllRequests,SpecificRequest };