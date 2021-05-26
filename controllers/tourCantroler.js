const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Filtring
    const queryObj = { ...req.query };
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach(el => delete queryObj[el]);

    // Advanced Filtring
    const queryStr = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`
      )
    );

    let query = Tour.find(queryStr);
    // Sorting
    if (req.query.fields) {
      const fields = req.query.fields.replace(/,/g, ' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page Dose not exist');
    }
    if (req.query.sort) {
      // Exicute The Query
      const sortBy = req.query.sort.replace(/,/g, ' ');
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }
    const tours = await query;

    // Send Response
    res.status(200).json({
      status: 'sucess',
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'sucess',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'sucess',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'sucess',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'sucess',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
