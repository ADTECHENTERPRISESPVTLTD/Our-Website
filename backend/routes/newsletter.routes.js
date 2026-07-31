const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  subscribeNewsletter,
  getSubscribers,
} = require("../controllers/newsletter.controller");

const router = express.Router();

// POST /api/newsletter
router.post("/", subscribeNewsletter);

// GET /api/newsletter
router.get("/", protect, admin, getSubscribers);

module.exports = router;

