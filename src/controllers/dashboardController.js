const Intern = require('../models/Intern');
const Task = require('../models/Task');
const WorkStatus = require('../models/WorkStatus');

exports.getDashboardSummary = async (req, res, next) => {
  try {
    const totalInterns = await Intern.countDocuments();
    const activeInterns = await Intern.countDocuments({ currentStatus: 'Active' });
    
    const onlineInterns = await WorkStatus.countDocuments({ status: 'Online' });
    const offlineInterns = await WorkStatus.countDocuments({ status: 'Offline' });
    
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ currentStatus: 'Pending' });
    const completedTasks = await Task.countDocuments({ currentStatus: 'Completed' });

    res.status(200).json({
      success: true,
      data: {
        totalInterns,
        activeInterns,
        onlineInterns,
        offlineInterns,
        totalTasks,
        pendingTasks,
        completedTasks
      }
    });
  } catch (error) {
    next(error);
  }
};
