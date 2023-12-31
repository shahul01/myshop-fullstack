import productRoutes from "./product.routes";
import type { Express } from 'express';

export function initRoutes(app: Express) {
  app.use('/test', (req, res) => {
    res.json({ message: 'Hello from backend!'});
  });

  app.use('/products', productRoutes);

};
