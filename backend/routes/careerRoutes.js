const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
    createCareer,
    getCareers,
} = require("../controllers/careerController");

const router = express.Router();

// POST /api/careers
router.post("/", upload.single("resume"), createCareer);

// GET /api/careers
router.get("/", getCareers);

module.exports = router;
