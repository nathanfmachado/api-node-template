import { Request, Response, Router } from 'express';
import { ProductController } from './controllers/product.controller';


export const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Root end-point' });
});

const productController = new ProductController();

route.post('/products', productController.create);
