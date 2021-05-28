const express = require('express');

const { signup } = require('../controllers/authController');
const {
  createUser,
  deleteUser,
  getAllUers,
  getUser,
  updateUser
} = require('../controllers/userCantroler');

const router = express.Router();

router.post('/signup', signup);

router
  .route('/')
  .get(getAllUers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
