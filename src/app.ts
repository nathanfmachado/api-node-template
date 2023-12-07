import express from 'express';
import { route } from '@/api/routes';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

export const app = express();
app.use(express.json());
app.use(route);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
