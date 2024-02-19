const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
const Request= require('./models/Request');
const authRoute = require('./routes/api/auth');
const requestRoute = require('./routes/api/request');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {verifyUser} = require('./middleware/VerifyUser');
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000','http://191.168.2.230:8081'],
    credentials : true
} 
));

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use('/verifyuser',verifyUser, (req,res)=>{
    res.json({username: req.username, phone: req.phone, role: req.role, user_id: req.user_id});
});

app.use('/api/auth', authRoute);

app.use('/api/request', requestRoute);

app.get('/requests/:userId',verifyUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const requests = await Request.find({ user: userId }).populate('users');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

{/*app.post('/sepcific',async (req, res) => {
    try {
        const {user_id} = req.body;
        const requests = await Request.find({ user_id: user_id });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});*/}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

