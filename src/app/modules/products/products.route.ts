import express from 'express';
import { ProductControllers } from './products.controller';

const router = express.Router();

router.post('/products', ProductControllers.createProduct);

router.get('/products', ProductControllers.getAllProducts);

router.get('/products/:productId', ProductControllers.getProductById);

router.put('/products/:productId', ProductControllers.updateProductById);

router.delete('/products/:productId', ProductControllers.deleteProductById);

export const ProductRoutes = router;
