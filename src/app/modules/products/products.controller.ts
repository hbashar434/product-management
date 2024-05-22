import { Request, Response } from 'express';
import { ProductServices } from './products.service';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiResponse } from '../../../utils/ApiResponse';
import { ApiError } from '../../../utils/ApiError';
import { validateObjectId } from '../../../utils/validateObjectId';
import { validateProductByZod } from './products.validation';

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const productBody = req.body;

  const productData = validateProductByZod(productBody);

  const result = await ProductServices.createProductInDB(productData);

  const response = new ApiResponse(
    201,
    result,
    'Product created successfully!',
  );
  res.status(201).json(response);
});

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { searchTerm } = req.query as { searchTerm?: string };

  const result = await ProductServices.getAllProductsFromDB(searchTerm);

  if (Array.isArray(result) && result.length === 0) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(
    200,
    result,
    `Products ${searchTerm ? `matching search term '${searchTerm}' ` : ''}fetched successfully!`,
  );
  res.status(200).json(response);
});

const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  validateObjectId(productId);
  const result = await ProductServices.getProductByIdFromDB(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(
    200,
    result,
    'Product fetched successfully!',
  );
  res.status(200).json(response);
});

const updateProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateData = req.body;

  validateObjectId(productId);

  const result = await ProductServices.updateProductByIdInDB(
    productId,
    updateData,
  );

  if (!result) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(
    200,
    result,
    'Product updated successfully!',
  );
  res.status(200).json(response);
});

const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  validateObjectId(productId);

  const result = await ProductServices.deleteProductByIdFromDB(productId);

  if (!result) {
    throw new ApiError(404, 'Product not found!');
  }

  const response = new ApiResponse(200, null, 'Product deleted successfully!');
  res.status(200).json(response);
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
