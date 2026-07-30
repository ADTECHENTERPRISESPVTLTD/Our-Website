const express = require("express");

const {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern,
} = require("../controllers/internController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getInterns)
  .post(createIntern);

router
  .route("/:id")
  .get(protect, getIntern)
  .put(protect, updateIntern)
  .delete(protect, deleteIntern);

module.exports = router;