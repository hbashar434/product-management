import mongoose, { Schema } from 'mongoose';
import { Order } from './orders.interface';

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = mongoose.model<Order>('Order', orderSchema);

export default OrderModel;
