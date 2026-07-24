const Requirement = require("../models/requirement.model");

// POST /api/requirements
const createRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Requirement submitted successfully",
      data: requirement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/requirements
const getRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRequirement,
  getRequirements,
};