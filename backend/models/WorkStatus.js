const mongoose = require("mongoose");

const workStatusSchema = new mongoose.Schema(
  {
    internId: {
      type: mongoose.Schema.ObjectId,
      ref: "Intern",
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Online", "Offline", "Busy", "Away"],
      default: "Offline",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorkStatus", workStatusSchema);