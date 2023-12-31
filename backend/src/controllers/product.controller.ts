import productService from '../services/product.service';
import type { Request, Response } from 'express';


async function getAllProducts(req:Request, res:Response) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ message: 'Internal Server Error. ' + errMessage });
  }
};


export default {
  getAllProducts,
};
