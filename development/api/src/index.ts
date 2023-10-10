import app from './app.ts';

const port = 4005;
// Start API
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}`);
});
