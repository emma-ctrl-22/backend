const User = require('../models/User')
const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

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
            role: req.body.role
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
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
        //res.status(200).json({
        //username: user.username,
            //_id: user._id,
            // Include any other user info you want to send
        //});
        if(isValidPassword) {
            const token = jwt.sign({ username: user.username, phone: user.phone, role: user.role,}, process.env.JWT_SECRET, { expiresIn: "1d" });
            if(res.status(201)){
                return res.status(200).json({ message: "token sent successful", token: token,
                username: user.username, // Include the username in the response
                role: user.role ,
                email:user.email
            });
            }else{
                return res.status(403).json({ message: "error sending token" });
            }
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
};


{/*const handleTokens = async ( req , res )=>{
   return res.json({username:req.username,phone:req.phone,role:req.role, user_id:req.user_id })
}*/}

module.exports = { handleNewUser, handleLogin };