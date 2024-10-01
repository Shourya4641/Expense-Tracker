import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './users/routes/user.routes.js';
import expenseRoutes from './expenses/routes/expense.route.js';

import { connectDB } from './libs/connectDB.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// global middlewares
app.use(express.json());

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/expenses', expenseRoutes);

// server setup
app.listen(PORT, () => {
    connectDB();
    console.log(`Server on: http://localhost:${PORT}`);
});