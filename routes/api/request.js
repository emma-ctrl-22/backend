const router = require('express').Router();
const Request = require('../../models/Request');

const { createRequest, getAllRequests, History, AssignRequest, PlasticRequest, PaperRequest, getRequestsByEmail } = require('../../controllers/requestController');

router.post('/', createRequest);

router.get('/allrequests', getAllRequests);

router.get('/userhistory', History);

// New route to get requests by email
router.get('/byemail', getRequestsByEmail);

router.get('/plastic', PlasticRequest);

router.get('/paper', PaperRequest);

router.post('/assigndriver', AssignRequest);

module.exports = router;