import productQuery from "../queries/product.query";
import { handleCatchError } from "../utils/error";


const getAllProducts = async () => {
  try {
    return await productQuery.getAllProducts();
  } catch (err) {
    handleCatchError(err);
  };
};


export default {
  getAllProducts
};
