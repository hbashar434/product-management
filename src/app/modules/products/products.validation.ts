import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventorySchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean(),
});

const productSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string().min(1, { message: 'Tags array cannot be empty' })),
  variants: z.array(variantSchema, {
    message: 'Variants array cannot be empty',
  }),
  inventory: inventorySchema,
});

export const validateProductByZod = (data: unknown) => {
  return productSchema.parse(data);
};
