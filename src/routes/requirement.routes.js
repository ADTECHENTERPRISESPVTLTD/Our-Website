const express = require("express");
const {
  createRequirement,
  getRequirements,
} = require("../controllers/requirement.controller");

const router = express.Router();

// POST /api/requirements
router.post("/", createRequirement);

// GET /api/requirements
router.get("/", getRequirements);

module.exports = router;