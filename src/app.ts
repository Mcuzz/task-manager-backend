import express from 'express';
import { taskRouter } from './routes/task.routes.js';
import { requestContext } from './middlewares/request-context.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

export const app = express();

app.use(requestContext);
app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

//la diablura que me avente para generar el error 500
app.get('/debug/error', () => {
   throw new Error('Prueba controlada del error 500');
});

app.use('/api/tasks', taskRouter);
app.use(notFound);
app.use(errorHandler);