import { Router } from 'express';
import ProductController from '../controllers/product.controllers';


const router = Router();

router.get('/', ProductController.getAllProducts);

export default router;
