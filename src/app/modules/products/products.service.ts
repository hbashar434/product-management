import { Product } from './products.interface';
import ProductModel from './products.model';

const createProductInDB = async (data: Product) => {
  const result = await ProductModel.create(data);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    result = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
  } else {
    result = await ProductModel.find();
  }
  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductByIdInDB = async (
  id: string,
  updateData: Partial<Product>,
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

const deleteProductByIdFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdFromDB,
};
