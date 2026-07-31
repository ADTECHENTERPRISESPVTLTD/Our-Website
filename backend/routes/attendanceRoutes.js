const express = require("express");

const {
  markOnline,
  markOffline,
  getAttendanceHistory,
  getAllAttendance,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/online", protect, markOnline);
router.put("/offline", protect, markOffline);

// Admin - Get all attendance
router.get("/", protect, getAllAttendance);

// Intern - Get attendance by internId
router.get("/:internId", protect, getAttendanceHistory);

module.exports = router;