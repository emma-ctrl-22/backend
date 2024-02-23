const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
const Request= require('./models/Request');
const User = require('./models/User');
const authRoute = require('./routes/api/auth');
const requestRoute = require('./routes/api/request');
const driverRoute = require("./routes/api/drivers");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {verifyUser} = require('./middleware/VerifyUser');
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000','http://172.20.10.5:8081','http://172.20.10.6:3000'],
    credentials : true
} 
));

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use('/verifyuser',verifyUser, (req,res)=>{
    res.json({username: req.username, phone: req.phone, role: req.role, user_id: req.user_id});
});

app.use('/api/auth', authRoute);

app.use('/api/request', requestRoute);

app.use('/api/drivers', driverRoute);

{/*app.get('/requests/', async (req, res) => {
    try {
        const userId = req.params.userId;
        const requests = await Request.find({ user: userId }).populate('users');
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/}
app.post('/userData', async (req, res) => {
    const {token}=req.body;
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        useremail = user.email;
    
        User.findOne({email:useremail}).then((data)=>{ 
            res.send({status:"ok",data:data})
        })
    } catch (error) {
        
    }
   
})

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

