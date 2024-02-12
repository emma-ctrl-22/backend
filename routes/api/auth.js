const router = require('express').Router();

const { handleNewUser, handleLogin } = require('../controllers/authcontroller');

router.post('/register', handleNewUser);

router.post('/login', handleLogin)


module.exports = router;