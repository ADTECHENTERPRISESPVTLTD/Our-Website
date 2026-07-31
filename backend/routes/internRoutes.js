const express = require("express");

const {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
  updatePresence,
} = require("../controllers/internController");

const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, admin, getInterns)
  .post(protect, admin, createIntern);

router.put("/presence/heartbeat", protect, updatePresence);

router
  .route("/:id")
  .get(protect, admin, getIntern)
  .put(protect, admin, updateIntern)
  .delete(protect, admin, deleteIntern);

module.exports = router;