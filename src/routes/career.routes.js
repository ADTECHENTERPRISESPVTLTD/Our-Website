const upload = require("../middleware/upload.middleware");
const express = require("express");

const {
    createCareer,
    getCareers,
} = require("../controllers/career.controller");

const router = express.Router();

// POST /api/careers
// router.post("/", createCareer);

router.post("/", upload.single("resume"), createCareer);

// GET /api/careers
router.get("/", getCareers);

module.exports = router;