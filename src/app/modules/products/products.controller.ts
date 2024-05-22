import { Request, Response } from 'express';
import { ProductServices } from './products.service';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const productData = req.body;

  const result = await ProductServices.createProductIntoDB(productData);

  const response = new ApiResponse(
    201,
    result,
    'Product created successfully!',
  );
  res.status(response.statusCode).json(response);
});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB();

  if (Array.isArray(result) && result.length === 0) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(
    200,
    result,
    'Products fetched successfully!',
  );
  res.status(response.statusCode).json(response);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getProductByIdFromDB(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(
    200,
    result,
    'Product fetched successfully!',
  );
  res.status(response.statusCode).json(response);
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};
