import express from 'express'
import { errorHandler } from './middleware/errorHandler.js';
import { protect } from './middleware/auth.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/error', (req, res, next) => {
    const err = new Error('test error');
    err.statusCode = 400;
    next(err);
})

app.use(errorHandler);

export default app;