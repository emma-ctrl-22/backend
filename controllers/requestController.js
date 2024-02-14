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

module.exports = { createRequest };