const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
    },
    college:{
        type: String,
        required: true,
        trim: true,
    },
    skills:{
        type: String,
        required: true,
        trim: true,
    },
    resumeUrl:{
        type: String,
        required: true,
        trim: true,
    },
    portfolio:{
        type: String,
        default: "",
        trim: true,
    },
    linkedin:{
        type: String,
        default: "",
        trim: true,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Career", careerSchema);