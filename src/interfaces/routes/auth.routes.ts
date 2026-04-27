import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";

export const authRoutes = (controller: AuthController) => {
  const router = Router();

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
};
