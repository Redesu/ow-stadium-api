import express from 'express'
import { errorHandler } from './middleware/errorHandler.js';
import heroesRouter from './routes/heroes.routes.js';
import itemsRouter from './routes/items.routes.js';
import powersRouter from './routes/powers.routes.js';
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpec } from '../swagger.js';

const app = express();

app.use(express.json());


app.use('/api/heroes', heroesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/powers', powersRouter);

app.use('/api/docs', serve, setup(swaggerSpec));

app.use(errorHandler);

export default app;