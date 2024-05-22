import OrderModel from './orders.model';
import { Order } from './orders.interface';

const createOrderInDB = async (data: Order) => {
  const result = await OrderModel.create(data);
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  let result;
  if (email) {
    result = await OrderModel.find({ email });
  } else {
    result = await OrderModel.find();
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
