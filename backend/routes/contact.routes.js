const express = require("express");

const {
  createContact,
  getContacts,
} = require("../controllers/contact.controller");

const router = express.Router();

// POST /api/contact
router.post("/", createContact);

// GET /api/contact
router.get("/", getContacts);

module.exports = router;
