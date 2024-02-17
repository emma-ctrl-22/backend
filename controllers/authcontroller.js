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
        res.status(200).json("success");
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }); // Assuming you use email to find the user
        if (!user) {
            return res.status(400).json("Wrong email");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong password");
        }
        else{
            const accessToken = jwt.sign({ username: user.username, role: user.role,phone: user.phone },
                 process.env.JWT_SECRET,{ expiresIn: '1d' });

            const refreshToken = jwt.sign({ username: user.username, role: user.role,phone: user.phone },
                process.env.JWT_SECRET,{ expiresIn: '1d' });
           
            res.cookie('refreshToken', refreshToken, {maxAge: 3600000, httpOnly: true, secure: true, sameSite: 'strict'});
            res.cookie('accessToken', accessToken, {maxAge: 90000000, httpOnly: true, secure: true, sameSite: 'strict'});
            res.json({ status: 200, role: user.role });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const handleTokens = async ( req , res )=>{
   return res.json({username:req.username,phone:req.phone})
}

module.exports = { handleNewUser, handleLogin , handleTokens };