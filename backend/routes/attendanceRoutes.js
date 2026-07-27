const express = require("express");

const {
  markOnline,
  markOffline,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/online", markOnline);
router.put("/offline", markOffline);
router.get("/:internId", getAttendanceHistory);

module.exports = router;