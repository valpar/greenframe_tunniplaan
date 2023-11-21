import app from './app';

require('dotenv').config();

// Start API
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${process.env.PORT}`);
});
