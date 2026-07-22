const Career = require("../models/career.model")

// Create career application

const createCareer = async (req, res) => {

    try{
        const careerData = {
            ...req.body,
            resumeUrl: req.file ? req.file.path: "",
        }

        const career = await Career.create(careerData);

        res.status(201).json({
            success: true,
            message: "Career application submitted successfully",
            data: career,
        });
    }catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all career Applications

const getCareers = async (req, res) =>{

    try{
        const careers = await Career.find().sort({ createdAt: -1}); 

        res.status(200).json({
            success: true,
            count: careers.length,
            data: careers,
        });
    }catch (error)
    {
        res.status(500).json({
            success: false,
            message: error.message,
    });
    }
};

module.exports = {
    createCareer,
    getCareers,
}