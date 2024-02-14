const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
const authRoute = require('./routes/api/auth');
const requestRoute = require('./routes/api/request');
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use('/api/auth', authRoute);

app.use('/api/request', requestRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

