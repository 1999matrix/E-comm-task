import express from 'express';
import { createProduct, getProducts , searchProducts } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/products', authMiddleware, createProduct);
router.get('/products', getProducts);
router.get('/products/search', searchProducts);

export default router;
