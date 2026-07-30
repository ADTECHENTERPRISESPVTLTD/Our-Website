const express = require("express");

const { protect, admin } = require("../middleware/authMiddleware");

const {
  createRequirement,
  getRequirements,
} = require("../controllers/requirementController");

const router = express.Router();

// POST /api/requirements
router.post("/", createRequirement);

// GET /api/requirements
router.get("/", protect, admin, getRequirements);

module.exports = router;
