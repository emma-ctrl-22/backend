const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Plastic", "Paper", "Glass", "Metal", "Other"]
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "completed"]
    },
    lat:{
        type: Number,
        required: true
    },  
    long:{
        type: Number,
        required: true
    },
    
},
{timestamps: true}
);