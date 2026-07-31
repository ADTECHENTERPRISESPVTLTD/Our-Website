const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createTask,
  getTasks,
  assignTask,
  updateTask,
  addComment,
  uploadAttachment,
  deleteTask,
} = require("../controllers/taskController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, getTasks)
  .post(protect, admin, createTask);

router
  .route("/:id")
  .put(protect, admin, updateTask)
  .delete(protect, admin, deleteTask);

  router.put("/:id/comment", protect, addComment);
  router.put(
  "/:id/attachment",
  protect,
  upload.single("file"),
  uploadAttachment
);

router.put("/:id/assign", protect, admin, assignTask);

module.exports = router;