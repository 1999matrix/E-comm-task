import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const buyerId = req.user.userId;

  const order = await prisma.order.create({
    data: {
      productId,
      quantity,
      buyerId,
      status: 'PENDING',
    },
  });
  res.json(order);
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { buyerId: req.user.userId },
    include: { product: true },
  });
  res.json(orders);
};
