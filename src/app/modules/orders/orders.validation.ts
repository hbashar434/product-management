import { z } from 'zod';

const orderSchemaZod = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const validateOrderByZod = (data: unknown) => {
  return orderSchemaZod.parse(data);
};
