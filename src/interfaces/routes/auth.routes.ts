import { AuthController } from '../controllers/auth.controller';
import { Router } from 'express';
import { authLimiter } from '../middlewares/rate-limit.middleware';

export const authRoutes = (controller: AuthController) => {
  const router = Router();

  router.post('/login', authLimiter, controller.login);
  router.post('/register', authLimiter, controller.register);
  router.post('/refresh', controller.refresh);

  return router;
};
