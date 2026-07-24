const Intern = require("../models/Intern");

const createIntern = async (req, res) => {
  try {
    const intern = await Intern.create(req.body);

    res.status(201).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getInterns = async (req, res) => {
  try {
    const interns = await Intern.find();

    res.status(200).json({
      success: true,
      count: interns.length,
      data: interns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getIntern = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    res.status(200).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    res.status(200).json({
      success: true,
      data: intern,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteIntern = async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
};