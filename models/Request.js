const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Plastic",
        enum: ["Plastic", "Paper", "Glass", "Metal", "Other"]
    },
    status: {
        type: String,
        enum: ["Pending", "completed"],
        default: "Pending"
    },
    lat:{
        type: Number,
        required: true
    },  
    long:{
        type: Number,
        required: true
    },
    TakenBy: {
        type: String,
        default: "anyone"
    }  ,
    author:{
        type:String
    },
    userId:{
        type:String
    }
},
{timestamps: true}
);

module.exports = mongoose.model("RequestTable", requestSchema);