// handles main logic
// excludes req, res handling and data handling

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
