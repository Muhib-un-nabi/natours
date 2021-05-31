const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRoute = require('./routes/userRoute');

const app = express();
// 1) GLOBAL Middelewares
// Set Securiety HTTP header
app.use(helmet());

// Development  logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// Body Parser, Reading Data from body into req.body
app.use(express.json({ limit: '10kb' }));

//  Data sanitization againest NOSQ: query injection
app.use(mongoSanitize());
//  Data sanitization against xss
app.use(xss());
// Prevent Parameter Poulation
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingAverage',
      'ratingQuantity',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
//  Serving Static Fiels
app.use(express.static('./public'));

//  Test Middlewares
app.use((req, res, next) => {
  console.log('Hello From The middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//  3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
// 4) Start Server
module.exports = app;
