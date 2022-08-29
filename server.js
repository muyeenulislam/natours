const mongoose = require('mongoose');
const dotenv = require('dotenv');

// unchaught exceptions
process.on('unhandledException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('successful'));

// start the server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});

// unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
