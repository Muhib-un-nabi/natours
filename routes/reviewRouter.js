const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('user'), getAllReviews)
  .post(createReview);

// router
//   .route('/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
