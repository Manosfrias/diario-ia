import { Router } from 'express';

export function createEntryRouter(entryController) {
  const router = Router();
  router.get('/', entryController.list);
  router.post('/', entryController.create);
  return router;
}
