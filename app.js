import '@babel/polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';


// routes
import usersRoute from './api/routes/user';
import accountRoute from './api/routes/account';
import transRoute from './api/routes/transaction';

const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Banka API',
    version: '1.0.0',
    description: 'API Endpoints',
  },
  host: 'localhost:3000',
  basePath: '/',
};
const options = {
  swaggerDefinition,
  apis: ['index.js'],
};
const swaggerSpec = swaggerJSDoc(options);


// express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/', usersRoute);
app.use('/api/v1/', accountRoute);
app.use('/api/v1/transactions', transRoute);
app.get('/', (req, res)=>{
  res.status(200).json({
    status: 200,
    message: `Welcome to Banka API.`
  })
});
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
