const express = require('express');
const {
  createIntern,
  getInterns,
  getIntern,
  updateIntern,
  deleteIntern
} = require('../controllers/internController');

const router = express.Router();

router
  .route('/')
  .get(getInterns)
  .post(createIntern);

router
  .route('/:id')
  .get(getIntern)
  .put(updateIntern)
  .delete(deleteIntern);

module.exports = router;
