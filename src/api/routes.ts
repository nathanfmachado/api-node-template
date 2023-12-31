import { Router } from 'express';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/category.controller';
import { PaymentController } from './controllers/payment.controller';


export const route = Router();

// Product routes
const productController = new ProductController();
route.post('/products', productController.create);
route.get('/products/:id', productController.getById);
route.put('/products/:id', productController.update);
route.delete('/products/:id', productController.delete);
route.get('/products', productController.list);

// Category routes
const categoryController = new CategoryController();
route.post('/categories', categoryController.create);
route.get('/categories/:id', categoryController.getById);
route.put('/categories/:id', categoryController.update);
route.delete('/categories/:id', categoryController.delete);
route.get('/categories', categoryController.list);

// Payment parts routes
const paymentController = new PaymentController();
route.get('/payment-parts/:id', paymentController.calculatePaymentParts);
