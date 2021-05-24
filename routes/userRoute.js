const express = require('express');

const {
  createUser,
  deleteUser,
  getAllUers,
  getUser,
  updateUser,
} = require('../controllers/userCantroler');

const router = express.Router();
router.route('/').get(getAllUers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
