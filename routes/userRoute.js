const express = require('express');

const {
  signup,
  login,
  forgotPassword,
  resetsPassword,
  updatePassword,
  protect,
  restrictTo
} = require('../controllers/authController');

const {
  createUser,
  deleteUser,
  getAllUers,
  getUser,
  updateUser,
  updateMe,
  deleteMe,
  getMe
} = require('../controllers/userCantroler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetsPassword);

// Protect All Routes After This Middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.patch('/deleteMe', deleteMe);

// Protect All Routes Use By Administrator
router.use(restrictTo('admin'));
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
