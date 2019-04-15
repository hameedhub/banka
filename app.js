import '@babel/polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// routes
import usersRoute from './api/routes/user';
import accountRoute from './api/routes/account';
import transRoute from './api/routes/transaction';

const app = express();

// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/accounts', accountRoute);
app.use('/api/v1/transactions', transRoute);

// error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((err, req, res, next)=>{
res.status(err.status || 500).json({
  status: err.status,
  error: err.message
})
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening to port ${port}`); });

export default app;
