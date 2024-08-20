import authRoutes from './auth.route';
import productRoutes from './product.route';
import userRoutes from './user.route';
import { verifyAuthTokenMW } from '../middlewares/auth/tokens';
import type { Express } from 'express';

export function initRoutes(app: Express) {
  app.use('/test', (req, res) => {
    res.json({ message: 'Hello from backend!'});
  });

  app.use('/test-auth', verifyAuthTokenMW, (req, res) => {
    res.json({ message: 'Auth token is valid' })
  });

  app.use('/products', productRoutes);

  app.use('/auth', authRoutes);

  app.use('/user', verifyAuthTokenMW, userRoutes);


};
