const express = require("express");

const {
  updateWorkStatus,
  getWorkStatus,
} = require("../controllers/workStatusController");

const router = express.Router();

router
  .route("/:internId")
  .get(getWorkStatus)
  .put(updateWorkStatus);

module.exports = router;