const express = require('express');

const {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  aliasTopTours
  // checkID,
  // middleware
} = require('../controllers/tourCantroler');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
