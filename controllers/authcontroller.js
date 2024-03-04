const User = require('../models/User')
const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { StreamChat } = require('stream-chat');
dotenv.config();

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

app.use(express.json())
app.use(cookieParser())


const handleNewUser = async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role,
            comAssociate:req.body.comAssociate,
            lat:req.body.lat,
            long:req.body.long
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) 
    {
        res.status(500).json('An error occurred in mongodb');
    }
};

const handleLogin = async (req, res) => {
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

        const token = jwt.sign({ username: user.username, phone: user.phone, role: user.role }, "the-jwt-secret-key", { expiresIn: "1d" });
        
        const streamToken = streamClient.createToken(user._id.toString());

        return res.status(200).json({
            message: "Token sent successfully",
            token: token,
            username: user.username,
            role: user.role,
            id: user._id,
            email: user.email,
            phone: user.phone,
            streamToken: streamToken,
        });

    } catch (err) {
        console.error("Login error in backend catch block:", err); // Log the actual error
        res.status(500).json({ message: "An error occurred catch block" });
    }
};


{/*const handleTokens = async ( req , res )=>{
   return res.json({username:req.username,phone:req.phone,role:req.role, user_id:req.user_id })
}*/}

module.exports = { handleNewUser, handleLogin };