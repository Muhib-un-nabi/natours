const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find();

  // Send Response
  res.status(200).json({
    status: 'sucess',
    results: review.length,
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  // Send Response
  res.status(201).json({
    status: 'sucess',
    data: {
      data: {
        review: newReview
      }
    }
  });
});
