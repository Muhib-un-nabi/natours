const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photos: req.body.photos,
    role: req.body.role
    // passwordChangeAt: '2019-04-30'
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //  Email and PassWord Is Exist
  if (!email || !password) {
    return next(new AppError('Please provide Email and Password!', 400));
  }
  //  Id User is Exist Then PassWorsd Is corrrect
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password!', 401));
  }
  //  If Ok Then Sent Tocke To Client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get acess', 401)
    );
  }
  // console.log(token);
  //  Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //  Check if User Still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The User belonging to this does no longer exist.', 401)
    );
  }
  //  Check If User Change Password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently change password! Please log in again.', 401)
    );
  }
  //  Grand Acess To Protected Route;
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have Permission to perform this action', 403)
    );
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get User Based On Posted Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with Email adress', 404));
  }
  // Genrated the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  const resetURL = ``;
  next();
});
exports.resetsPassword = catchAsync(async (req, res, next) => {});
