const express = require("express");
const {
  sendMessage,
  getMessages,
  markAsRead,
} = require("../controllers/messageController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, admin, sendMessage)
  .get(protect, getMessages);

router.route("/:id/read")
  .put(protect, markAsRead);

module.exports = router;
