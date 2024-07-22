import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/orders', authMiddleware, createOrder);
router.get('/orders', authMiddleware, getOrders);

export default router;
