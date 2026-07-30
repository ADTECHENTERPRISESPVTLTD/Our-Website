const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const lastTask = await Task.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastTask && lastTask.taskCode) {
      nextNumber = parseInt(lastTask.taskCode.split("-")[1], 10) + 1;
    }

    req.body.taskCode = `TASK-${String(nextNumber).padStart(3, "0")}`;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let query;

    if (req.query.internId) {
      query = Task.find({ assignedIntern: req.query.internId });
    } else {
      query = Task.find();
    }

    query.populate({
      path: "assignedIntern",
      select: "fullName email role",
    });

    const tasks = await query;

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const assignTask = async (req, res) => {
  try {
    const { internId } = req.body;

    if (!internId) {
      return res.status(400).json({
        success: false,
        error: "Please provide internId",
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedIntern: internId },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { author, text } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    task.comments.push({
      author,
      text,
    });

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const uploadAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    task.attachedFile = req.file.filename;

    await task.save();

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
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
  createTask,
  getTasks,
  assignTask,
  updateTask,
  addComment,
  uploadAttachment,
  deleteTask,
};