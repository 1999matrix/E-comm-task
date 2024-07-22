import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, tags, image } = req.body;
  const sellerId = req.user.userId;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      tags,
      image,
      sellerId,
    },
  });
  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

// Add other CRUD operations (update, delete)


export const searchProducts = async (req: Request, res: Response) => {
    const { query, category, minPrice, maxPrice, rating } = req.query;
  
    const products = await prisma.product.findMany({
      where: {
        AND: [
          query ? { name: { contains: query as string, mode: 'insensitive' } } : {},
          category ? { category: category as string } : {},
          minPrice ? { price: { gte: parseFloat(minPrice as string) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice as string) } } : {},
          rating ? { reviews: { some: { rating: { gte: parseInt(rating as string) } } } } : {},
        ],
      },
    });
  
    res.json(products);
  };