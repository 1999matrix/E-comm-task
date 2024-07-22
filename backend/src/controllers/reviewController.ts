import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addReview = async (req: Request, res: Response) => {
  const { rating, comment, productId } = req.body;
  const userId = req.user.userId;

  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      productId,
      userId,
    },
  });
  res.json(review);
};

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const reviews = await prisma.review.findMany({
    where: { productId: parseInt(productId) },
    include: { user: true },
  });
  res.json(reviews);
};
