import express, { json } from 'express';
import morgan from 'morgan';

//Importing routes
import userRoutes from './routes/users';
import stockRoutes from './routes/stocks';
import authRoutes from './routes/auth';

const app = express();
require('dotenv').config();

// Authentication
const authentication = require('../middlewares/authentication');

//Middlewares
app.use(morgan('dev'));
app.use(json());

//Routes
app.use(authRoutes);
app.use('/api/v1/users', authentication, userRoutes);
app.use('/api/v1/stocks', stockRoutes);

export default app;