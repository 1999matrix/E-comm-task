import express from 'express';
import { addReview, getReviews } from '../controllers/reviewController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/reviews', authMiddleware, addReview);
router.get('/reviews/:productId', getReviews);

export default router;
