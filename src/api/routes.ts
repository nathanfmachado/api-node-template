import { Request, Response, Router } from 'express';
import { ProductController } from './controllers/product.controller';


export const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Root end-point' });
});

const productController = new ProductController();

route.post('/products', productController.create);
route.get('/products/:id', productController.getById);
route.put('/products/:id', productController.update);
route.delete('/products/:id', productController.delete);
route.get('/products', productController.list);

