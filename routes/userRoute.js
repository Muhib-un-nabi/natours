const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetsPassword,
  updatePassword
} = require('../controllers/authController');
const {
  createUser,
  deleteUser,
  getAllUers,
  getUser,
  updateUser,
  updateMe,
  deleteMe
} = require('../controllers/userCantroler');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetsPassword);

router.patch('/updateMyPassword', protect, updatePassword);

router.patch('/updateMe', protect, updateMe);
router.patch('/deleteMe', protect, deleteMe);

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
