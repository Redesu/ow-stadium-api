import express from 'express'
import { errorHandler } from './middleware/errorHandler.js';
import heroesRouter from './routes/heroes.routes.js';
import itemsRouter from './routes/items.routes.js';
import powersRouter from './routes/powers.routes.js';
import syncRouter from './routes/sync.routes.js';
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpec } from '../swagger.js';
import radisClient from './config/redis.js'
import rateLimit from 'express-rate-limit';


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    skip: (req) => {
        const trustedIps = process.env.TRUSTED_IPS ? process.env.TRUSTED_IPS.split(',') : [];
        const isWhitelisted = trustedIps.includes(req.ip);
        return isWhitelisted;
    },
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});


const app = express();

app.set('trust proxy', 2)

app.use(express.json());

app.use(apiLimiter);
app.use('/api/heroes', heroesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/powers', powersRouter);
app.use('/api/sync', syncRouter);

app.use('/api/docs', serve, setup(swaggerSpec));

app.use(errorHandler);

export default app;