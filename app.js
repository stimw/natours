const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // for req.body, req.params ...
app.use(express.static(`${__dirname}/public`)); // then can access 127.0.0.1:3000/overview.html
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  // Express will automatically know there's an error
  // and it will skip all the other middleware
  // and send the error to the global error handling middleware (below)
});

app.use(globalErrorHandler);

module.exports = app;
