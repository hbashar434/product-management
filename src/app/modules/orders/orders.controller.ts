import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { OrderServices } from './orders.service';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderServices.createOrderInDB(orderData);

  const response = new ApiResponse(201, result, 'Order created successfully!');
  res.status(response.statusCode).json(response);
});

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB();

  if (Array.isArray(result) && result.length === 0) {
    throw new ApiError(404, 'Orders not found!');
  }

  const response = new ApiResponse(200, result, 'Orders fetched successfully!');
  res.status(response.statusCode).json(response);
});

const getOrdersByEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await OrderServices.getOrdersByEmailFromDB(email);

  if (Array.isArray(result) && result.length === 0) {
    throw new ApiError(404, 'Orders not found for this email!');
  }

  const response = new ApiResponse(
    200,
    result,
    'Orders fetched successfully for user email!',
  );
  res.status(response.statusCode).json(response);
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
