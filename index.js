const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
dotenv.config();
const Request= require('./models/Request');
const User = require('./models/User');
const authRoute = require('./routes/api/auth');
const requestRoute = require('./routes/api/request');
const driverRoute = require("./routes/api/drivers");
const dashboardRoute = require("./routes/api/dashboard");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {verifyUser} = require('./middleware/VerifyUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser())

// Updated CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://172.20.10.5:8081',
  'http://191.168.11.42:3000',
  // Add your Render frontend URL here when you deploy it
  'https://ecohaul-frontend.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      // In production, allow any origin
      return callback(null, true);
    } else {
      // In development, check against allowed origins
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  },
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://emmanuelnyatepe35:tickle@tables.atgxdit.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/verifyuser',verifyUser, (req,res)=>{
    res.json({username: req.username, phone: req.phone, role: req.role, user_id: req.user_id});
});

app.use('/api/auth', authRoute);

app.use('/api/request', requestRoute);

app.use('/api/drivers', driverRoute);

// Add the dashboard route
app.use('/api/dashboard', dashboardRoute);

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

app.post('/login', async (req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(403).json({ message: "Invalid email or password" });
        }
        //res.status(200).json({
        //username: user.username,
            //_id: user._id,
            // Include any other user info you want to send
        //});
        if(isValidPassword) {
            const token = jwt.sign({ username: user.username, phone: user.phone, role: user.role,}, "the-jwt-secret-key", { expiresIn: "1d" });
           
            

            if(res.status(201)){
                return res.status(200).json({ message: "token sent successful", token: token,
                username: user.username, // Include the username in the response
                role: user.role ,
                id: user._id,
                email:user.email,
                phone: user.phone,
                
                assignedArea
            });
            }else{
                return res.status(403).json({ message: "error sending token" });
            }
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
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

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

