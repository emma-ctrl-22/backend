const router = require('express').Router();

const { createRequest } = require('../../controllers/requestController');

router.post('/request', createRequest);




module.exports = router;