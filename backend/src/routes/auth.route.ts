import { Router } from 'express';
import authController from '../controllers/auth.controller';


const router = Router();

router.get('/register', authController.register);

export default router;
