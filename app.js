const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRoute = require('./routes/userRoute');

const app = express();
// 1) Middeleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static('./public'));

app.use((req, res, next) => {
  console.log('Hello From The middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//  3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRoute);

app.get('/', (req, res) => {
  res
    .status(404)
    .json({ massage: 'Hello from the server side!', app: 'Natures' });
});

app.post('/', (req, res) => {
  res.send('you Can Post to this endPoint...');
});

// 4) Start Server
module.exports = app;
