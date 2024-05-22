import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { OrderServices } from './orders.service';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import ProductModel from '../products/products.model';
import { validateOrderByZod } from './orders.validation';
import { validateObjectId } from '../../../utils/validateObjectId';

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderBody = req.body;
  const orderData = validateOrderByZod(orderBody);

  validateObjectId(orderData?.productId);

  const product = await ProductModel.findById(orderData?.productId);

  if (!product) {
    throw new ApiError(404, 'Product does not exist!');
  }

  if (orderData.quantity > product.inventory.quantity) {
    throw new ApiError(400, 'Insufficient quantity available in inventory');
  }

  const updatedQuantity = product.inventory.quantity - orderData.quantity;
  const updatedInStock = updatedQuantity > 0;

  await ProductModel.findByIdAndUpdate(product._id, {
    inventory: {
      quantity: updatedQuantity,
      inStock: updatedInStock,
    },
  });

  const result = await OrderServices.createOrderInDB(orderData);

  const response = new ApiResponse(201, result, 'Order created successfully!');
  res.status(201).json(response);
});

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query as { email?: string };

  const result = await OrderServices.getAllOrdersFromDB(email);

  if (Array.isArray(result) && result.length === 0) {
    throw new ApiError(
      404,
      `Orders not found ${email ? 'for this email' : ''}`,
    );
  }

  const response = new ApiResponse(200, result, 'Orders fetched successfully!');
  res.status(200).json(response);
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
