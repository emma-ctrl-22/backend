const router = require('express').Router();
const Request = require('../../models/Request');

const { createRequest,getAllRequests ,History,AssignRequest} = require('../../controllers/requestController');

router.post('/', createRequest);

router.get('/allrequests', getAllRequests);

router.get('/userhistory',History);

router.post('/assigndriver', AssignRequest)

module.exports = router;