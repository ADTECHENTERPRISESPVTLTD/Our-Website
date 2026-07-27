const Attendance = require("../models/Attendance");

const markOnline = async (req, res) => {
  try {
    const { internId } = req.body;

    if (!internId) {
      return res.status(400).json({
        success: false,
        error: "Please provide internId",
      });
    }

    const activeAttendance = await Attendance.findOne({
      internId,
      logoutTime: { $exists: false },
    });

    if (activeAttendance) {
      return res.status(400).json({
        success: false,
        error: "Already marked online without logging out",
      });
    }

    const attendance = await Attendance.create({
      internId,
      loginTime: new Date(),
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const markOffline = async (req, res) => {
  try {
    const { internId } = req.body;

    if (!internId) {
      return res.status(400).json({
        success: false,
        error: "Please provide internId",
      });
    }

    const attendance = await Attendance.findOne({
      internId,
      logoutTime: { $exists: false },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        error: "No active online session found for this intern",
      });
    }

    const logoutTime = new Date();
    attendance.logoutTime = logoutTime;
    attendance.totalWorkingHours = Math.abs(logoutTime - attendance.loginTime) / 36e5;

    await attendance.save();

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAttendanceHistory = async (req, res) => {
  try {
    const attendance = await Attendance.find({ internId: req.params.internId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  markOnline,
  markOffline,
  getAttendanceHistory,
};