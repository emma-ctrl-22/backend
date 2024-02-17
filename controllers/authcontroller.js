const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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
                 process.env.JWT_SECRET,{ expiresIn: '15m' });

            const refreshToken = jwt.sign({ username: user.username, role: user.role,phone: user.phone },
                process.env.JWT_SECRET,{ expiresIn: '1d' });
           
            res.cookie('refreshToken', refreshToken, {maxAge: 36000, httpOnly: true, secure: true, sameSite: 'strict'});
            res.cookie('accessToken', accessToken, {maxAge: 900000, httpOnly: true, secure: true, sameSite: 'strict'});
            res.json("Login Succesful")
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { handleNewUser, handleLogin };