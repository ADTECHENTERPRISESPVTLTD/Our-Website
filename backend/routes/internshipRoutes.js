const express = require("express");

const router = express.Router();

const {
  createInternship,
} = require("../controllers/internshipController");

router.post("/", createInternship);

module.exports = router;