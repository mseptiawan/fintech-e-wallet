import { Router } from 'express'

export const walletRoutes = (controller: any) => {
  const router = Router()

  router.get('/', controller.getWallet)

  return router
}