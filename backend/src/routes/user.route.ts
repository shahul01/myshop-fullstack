import { Router } from 'express';
import userController from '../controllers/user.controller';


const router = Router();

router
  .route('/:email')
  .get(userController.getUserByEmail);

router
  // .route('/update/:email')
  .route('/:id')
  .patch(userController.updateUserDetails);

export default router;
