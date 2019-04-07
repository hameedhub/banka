const express = require('express');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

// ROUTES
const usersRoute = require('./api/routes/user');
const accountRoute = require('./api/routes/account');
const transRoute = require('./api/routes/transaction');

// EXPRESS APP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// PREVENTING CORS ERRORS
app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS') {
		res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, GET, DELETE');
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

app.listen(port, () => { console.log(`Listening to port ${port}`) });

module.exports = app;
