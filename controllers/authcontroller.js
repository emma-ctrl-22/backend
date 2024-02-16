const User = require('../models/User')
const bcrypt = require('bcrypt');

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
        const user = await User.findOne({ username: req.body.email });
        !user && res.status(400).json("Wrong username or password");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong username or password");

        res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { handleNewUser, handleLogin };