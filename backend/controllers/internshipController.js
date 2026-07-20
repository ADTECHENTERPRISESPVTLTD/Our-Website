const Internship = require("../models/Internship");

const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create(req.body);

    res.status(201).json({
      success: true,
      message: "Internship application submitted successfully",
      data: internship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createInternship };