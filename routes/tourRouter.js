const express = require('express');

const {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  checkID,
  middleware,
} = require('../controllers/tourCantroler');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(middleware, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
