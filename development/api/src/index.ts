/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
require('dotenv').config();

import app from './app';


// Start API
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${process.env.PORT}`);
});
