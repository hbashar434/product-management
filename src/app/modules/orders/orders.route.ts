import express from 'express';
import { OrderControllers } from './orders.controller';

const router = express.Router();

router.post('/orders', OrderControllers.createOrder);

router.get('/orders', OrderControllers.getAllOrders);

router.get('/orders/:email', OrderControllers.getOrdersByEmail);

export const OrderRoutes = router;
