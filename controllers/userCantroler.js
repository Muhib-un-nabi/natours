const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'sucess',
    results: users.length,
    requestedAt: req.requestTime,
    data: {
      users
    }
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet define'
  });
};
