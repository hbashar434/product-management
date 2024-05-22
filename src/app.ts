import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { errorHandler } from './utils/errorHandler';
import { ProductRoutes } from './app/modules/products/products.route';
import { OrderRoutes } from './app/modules/orders/orders.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

// Error handling middleware
app.use(errorHandler);

// server start here
const getAController = (req: Request, res: Response) => {
  res.send('E-commerce Product Management Ongoing...');
};

app.get('/', getAController);

export default app;
