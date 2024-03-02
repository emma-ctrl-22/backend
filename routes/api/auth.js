const router = require('express').Router();
const { handleNewUser, handleLogin,handleTokens } = require('../../controllers/authcontroller');

router.post('/register', handleNewUser);
router.post('/login', handleLogin)


module.exports = router;