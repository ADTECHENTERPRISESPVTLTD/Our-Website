const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
   phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    preferredDate: {
        type: String,
        required: true,
    },
   preferredTime:{
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Callback", callbackSchema);