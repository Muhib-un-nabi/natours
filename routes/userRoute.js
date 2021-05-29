const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetsPassword
} = require('../controllers/authController');
const {
  createUser,
  deleteUser,
  getAllUers,
  getUser,
  updateUser
} = require('../controllers/userCantroler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetsPassword', resetsPassword);

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
