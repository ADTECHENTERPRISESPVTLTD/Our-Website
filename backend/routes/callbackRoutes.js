const express = require("express");

const { protect, admin } = require("../middleware/authMiddleware");

const {
    createCallback,
    getCallbacks,
} = require("../controllers/callbackController");

const router = express.Router();

// POST /api/callback
router.post("/", createCallback);

// GET /api/callback
router.get("/", protect, admin, getCallbacks);

module.exports = router;
