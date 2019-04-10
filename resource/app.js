import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// ROUTES
import usersRoute from './api/routes/user';
import accountRoute from './api/routes/account';
import transRoute from './api/routes/transaction';

const app = express();

// EXPRESS APP MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PREVENTING CORS ERRORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/accounts', accountRoute);
app.use('/api/v1/transactions', transRoute);

// ERROR HANDLER
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
  });
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening to port ${port}`); });

export default app;
