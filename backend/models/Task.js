const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: [true, "Please add a task title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: [true, "Please add a deadline"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    taskCode: {
      type: String,
      unique: true,
    },
    assignedIntern: {
      type: mongoose.Schema.ObjectId,
      ref: "Intern",
      required: true,
    },
    currentStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    category: {
      type: String,
      default: "General",
    },
    comments: [
  {
    author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
],

  attachedFile: {
  type: String,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);