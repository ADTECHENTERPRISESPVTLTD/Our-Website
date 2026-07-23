const Career = require("../models/career.model");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const createCareer = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }

        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "adtech-resumes",
            resource_type: "auto",
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        const career = await Career.create({
            ...req.body,
            resumeUrl: uploadResult.secure_url,
        });

        res.status(201).json({
            success: true,
            message: "Career application submitted successfully",
            data: career,
        });

    } catch (error) {

        // Delete file if upload fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all career applications
const getCareers = async (req, res) => {
    try {

        const careers = await Career.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: careers.length,
            data: careers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCareer,
    getCareers,
};