import pool from "../config/db";
import type { Product } from "../types/product.type";


async function getAllProducts() {
  const query = 'SELECT * FROM products';
  const result = await pool.query<Product>(query);
  return result.rows;
};


export default {
  getAllProducts
};
