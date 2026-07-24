const Attendance = require('../models/Attendance');

exports.markOnline = async (req, res, next) => {
  try {
    const { internId } = req.body;
    
    if (!internId) {
      return res.status(400).json({ success: false, error: 'Please provide internId' });
    }

    let attendance = await Attendance.findOne({
      internId,
      logoutTime: { $exists: false }
    });

    if (attendance) {
      return res.status(400).json({ success: false, error: 'Already marked online without logging out' });
    }

    attendance = await Attendance.create({
      internId,
      loginTime: new Date()
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};

exports.markOffline = async (req, res, next) => {
  try {
    const { internId } = req.body;

    if (!internId) {
      return res.status(400).json({ success: false, error: 'Please provide internId' });
    }

    const attendance = await Attendance.findOne({
      internId,
      logoutTime: { $exists: false }
    });

    if (!attendance) {
      return res.status(404).json({ success: false, error: 'No active online session found for this intern' });
    }

    const logoutTime = new Date();
    attendance.logoutTime = logoutTime;

    const hours = Math.abs(logoutTime - attendance.loginTime) / 36e5;
    attendance.totalWorkingHours = hours;

    await attendance.save();

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    next(error);
  }
};
exports.getAttendanceHistory = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ internId: req.params.internId }).sort({ date: -1 });
    res.status(200).json({ success: true, count: attendance.length, data: attendance });
  } catch (error) {
    next(error);
  }
};
