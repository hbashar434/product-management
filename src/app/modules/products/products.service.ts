import { Product } from './products.interface';
import ProductModel from './products.model';

const createProductIntoDB = async (data: Product) => {
  const result = await ProductModel.create(data);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
};
