import { z } from 'zod';

const variantSchemaZod = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const inventorySchemaZod = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean(),
});

const productSchemaZod = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string().min(1, { message: 'Tags array cannot be empty' })),
  variants: z.array(variantSchemaZod, {
    message: 'Variants array cannot be empty',
  }),
  inventory: inventorySchemaZod,
});

export const validateProductByZod = (data: unknown) => {
  return productSchemaZod.parse(data);
};
