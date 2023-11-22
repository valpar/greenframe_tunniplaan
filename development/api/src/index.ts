require('dotenv').config();

// eslint-disable-next-line import/first
import app from './app';

// Start API
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${process.env.PORT}`);
});
