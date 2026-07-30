const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");
const {
    createCareer,
    getCareers,
} = require("../controllers/careerController");

const router = express.Router();

// POST /api/careers
router.post("/", upload.single("resume"), createCareer);

// GET /api/careers
router.get("/", protect, admin, getCareers);

module.exports = router;
