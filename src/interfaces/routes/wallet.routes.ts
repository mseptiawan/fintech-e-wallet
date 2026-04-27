import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

export const walletRoutes = (controller: any) => {
  const router = Router();

  router.get('/me', controller.getWallet);

  return router;
};
