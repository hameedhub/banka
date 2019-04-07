const express = require('express');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

// EXPRESS APP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
const usersRoute = require('./api/routes/user');
const accountRoute = require('./api/routes/account');
const transRoute = require('./api/routes/transaction');

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

app.listen(port, () => { console.log(`Listening to port ${port}`) });

module.exports = app;
