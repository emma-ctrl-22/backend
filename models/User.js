const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin","driver"]
    },
    companyName:{
        type : String,
        default:""
    },
    comLocation:{
        lat: { type: Number,
        default:"" },
        long: { type: Number,
        default:"" }
    },
    comAssociate:{
        type: String,
        default:""
    },
    comLocation:{
        lat: { type: Number,
        default:"2.5847464" },
        long: { type: Number,
        default:"1.56783934" }
    }
},{timestamps: true}
);

module.exports = mongoose.model("newUser", userSchema);