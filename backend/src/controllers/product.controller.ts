import productService from '../services/product.service';
import { handleCatchError } from '../utils/error';
import type { Request, Response } from 'express';


const getAllProducts = async (req:Request, res:Response) => {
  try {
    const allProducts = await productService.getAllProducts();
    res.status(200).json(allProducts);
  } catch (err) {
    handleCatchError(err);
  };
};


export default {
  getAllProducts,
};
