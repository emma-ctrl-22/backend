const Request = require('../models/Request');

const createRequest = async (req, res) => {
    try {
        const newRequest = new Request({
            username: req.body.username,
            type: req.body.type,
            status: req.body.status,
            lat: req.body.lat,
            long: req.body.long
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

module.exports = { createRequest, getAllRequests };