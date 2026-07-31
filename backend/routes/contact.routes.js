const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  createContact,
  getContacts,
} = require("../controllers/contact.controller");

const router = express.Router();

// POST /api/contact
router.post("/", createContact);

// GET /api/contact
router.get("/", protect, admin, getContacts);

module.exports = router;
