const router = require('express').Router();

const { createRequest,getAllRequests } = require('../../controllers/requestController');

router.post('/', createRequest);

router.get('/allrequests', getAllRequests);




module.exports = router;