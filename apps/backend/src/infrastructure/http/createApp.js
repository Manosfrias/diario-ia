import express from 'express';
import { createEntryRouter } from './routes/entryRoutes.js';
import { createErrorHandler, notFoundHandler } from './middleware/errorHandler.js';

export function createApp({ entryController, logger }) {
  const app = express();

  app.use(express.json());
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/entries', createEntryRouter(entryController));
  app.use(notFoundHandler);
  app.use(createErrorHandler(logger));

  return app;
}
