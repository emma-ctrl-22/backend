const router = require('express').Router();
const Request = require('../../models/Request');

const { createRequest,getAllRequests ,SpecificRequest} = require('../../controllers/requestController');

router.post('/', createRequest);

router.get('/allrequests', getAllRequests);

router.post('/specific', SpecificRequest);




module.exports = router;