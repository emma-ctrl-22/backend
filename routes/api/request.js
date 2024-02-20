const router = require('express').Router();
const Request = require('../../models/Request');

const { createRequest,getAllRequests ,History} = require('../../controllers/requestController');

router.post('/', createRequest);

router.get('/allrequests', getAllRequests);

router.get('/userhistory',History);

module.exports = router;