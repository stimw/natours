const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' }); // config first
// console.log(process.env);

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log('DB connection successful!');
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

// uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION, shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
