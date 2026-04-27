import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { WalletController } from '../controllers/wallet.controller';

export const walletRoutes = (controller: WalletController) => {
  const router = Router();

  router.get('/me', authMiddleware, controller.getWallet); // ✅ FIX

  return router;
};
