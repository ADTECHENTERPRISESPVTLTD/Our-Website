const WorkStatus = require("../models/WorkStatus");
const Intern = require("../models/Intern");

const updateWorkStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const internId = req.params.internId;

    if (!["Online", "Offline", "Busy", "Away"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    const intern = await Intern.findById(internId);

    if (!intern) {
      return res.status(404).json({
        success: false,
        error: "Intern not found",
      });
    }

    let workStatus = await WorkStatus.findOne({ internId });

    if (workStatus) {
      workStatus.status = status;
      await workStatus.save();
    } else {
      workStatus = await WorkStatus.create({
        internId,
        status,
      });
    }

    res.status(200).json({
      success: true,
      data: workStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getWorkStatus = async (req, res) => {
  try {
    const workStatus = await WorkStatus.findOne({ internId: req.params.internId });

    if (!workStatus) {
      return res.status(404).json({
        success: false,
        error: "Work status not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  updateWorkStatus,
  getWorkStatus,
};