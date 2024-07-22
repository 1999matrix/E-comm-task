const { Product } = require('../models/DBInit');
// const { BadRequest } = require('../utils/appErrors');

export const createProduct = async (product) => {
    return await Product.create({
        data: product
    })
};

export const fetchProduct = async (productId) => {
    return await Product.findUnique({
        where: {
            id: productId
        }
    })
}

export const fetchProductSearchResults = async (arg) => {
    return Product.findMany({
        where: {
            name: {
                search: arg
            }
        }
    });
};

export const fetchProductsWithPagination = async (category, skip, take) => {
    let products;

    if (category) {
        products = await Product.findMany({
            skip: skip,
            take: take,
            where: {
                category: {
                    categoryName: category
                }
            }
        });
    } else {
        products = await Product.findMany({
            skip: skip,
            take: take
        });
    }

    return products
};

export const fetchProductForCart = async (productId) => {
    return await Product.findUnique({
        where: {
            id: productId
        },
        select: {
            name: true,
            price: true,
            stock: true
        }
    });
};

export const fetchProductForReview = async (productId) => {
    return await Product.findUnique({
        where: {
            id: productId
        },
        select: {
            reviews: true
        }
    })
};

// for order rouute // items
export const updateProductStockForOrder =  async (item) => {
        const updatedProduct = await Product.update({
            where: {
                id: item.productId
            }, 
            data: {
                stock: {
                    decrement:item.quantity
                }
            }
        });

        return updatedProduct

      
};

export const updateProductStock = async (productId, stock) => {
    return await Product.update({
        where: {
            id: productId
        },
        data: {
            stock: {
                increment: stock
            }
        }
    });
};

