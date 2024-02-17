const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
const authRoute = require('./routes/api/auth');
const requestRoute = require('./routes/api/request');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {verifyUser} = require('./middleware/VerifyUser');
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    credentials : true
} 
));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use('/verifyuser',verifyUser, (req,res)=>{
    res.json({username: req.username, phone: req.phone});
});

app.use('/api/auth', authRoute);

app.use('/api/request', requestRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

