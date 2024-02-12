const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
const authRoute = require('./routes/auth');

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

