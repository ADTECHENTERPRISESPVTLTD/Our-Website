const express = require("express");

const {
  subscribeNewsletter,
  getSubscribers,
} = require("../controllers/newsletter.controller");

const router = express.Router();

// POST /api/newsletter
router.post("/", subscribeNewsletter);

// GET /api/newsletter
router.get("/", getSubscribers);

module.exports = router;

