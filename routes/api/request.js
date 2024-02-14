const router = require('express').Router();

const { createRequest } = require('../../controllers/requestController');

router.post('/', createRequest);




module.exports = router;