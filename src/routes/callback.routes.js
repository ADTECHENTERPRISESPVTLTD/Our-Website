const express = require("express");

const {
    createCallback,
    getCallbacks,
} = require("../controllers/callback.controller");

const router = express.Router();

// POST/api/callback

router.post("/", createCallback);

// GET/api/callback

router.get("/", getCallbacks);

module.exports = router;