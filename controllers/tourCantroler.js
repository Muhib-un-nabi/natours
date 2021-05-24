const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// 2) Route handler
exports.checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};

exports.middleware = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing Name or Price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((ele) => ele.id === id);
  res.status(200).json({
    status: 'sucess',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };

  const toursUpdated = [...tours, newTour];
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(toursUpdated),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
