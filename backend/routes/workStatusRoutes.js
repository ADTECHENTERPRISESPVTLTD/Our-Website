const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  updateWorkStatus,
  getWorkStatus,
} = require("../controllers/workStatusController");


const router = express.Router();

router
  .route("/:internId")
  .get(protect, getWorkStatus)
  .put(protect, updateWorkStatus);

module.exports = router;