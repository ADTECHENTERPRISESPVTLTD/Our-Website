const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    let query;
    if (req.query.internId) {
      query = Task.find({ assignedIntern: req.query.internId });
    } else {
      query = Task.find();
    }
    
    query.populate({
      path: 'assignedIntern',
      select: 'fullName email role'
    });

    const tasks = await query;
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

exports.assignTask = async (req, res, next) => {
  try {
    const { internId } = req.body;
    if (!internId) {
      return res.status(400).json({ success: false, error: 'Please provide internId' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedIntern: internId },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
