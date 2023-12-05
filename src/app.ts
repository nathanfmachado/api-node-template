import express from 'express';
import { route } from '@/api/routes';

export const app = express();
app.use(express.json());
app.use(route);
