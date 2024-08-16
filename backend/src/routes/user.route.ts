import { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyAuthTokenMW } from '../middlewares/auth/tokens';


const router = Router();

router
  .route('/:email')
  .get(verifyAuthTokenMW, userController.getUserByEmail);

router
  // .route('/update/:email')
  .route('/:id')
  .patch(verifyAuthTokenMW, userController.updateUserDetails);

export default router;
