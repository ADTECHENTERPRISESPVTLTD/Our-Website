const express = require('express');
const {
  createTask,
  getTasks,
  assignTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router
  .route('/')
  .get(getTasks)
  .post(createTask);

router
  .route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.put('/:id/assign', assignTask);

module.exports = router;
