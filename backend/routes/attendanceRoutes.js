const express = require("express");

const {
  markOnline,
  markOffline,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/online", protect, markOnline);
router.put("/offline", protect, markOffline);
router.get("/:internId", protect, getAttendanceHistory);

module.exports = router;