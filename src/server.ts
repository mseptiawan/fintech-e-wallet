import { app } from './app';
import { connectMongo } from './infrastructure/database/mongo.connection';
// repo
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import { MongoWalletRepository } from './infrastructure/repositories/mongo-wallet.repository';

// usecase
import { RegisterUseCase } from './application/usecases/auth/register.usecase';
import { LoginUseCase } from './application/usecases/auth/login.usecase';
import { GetWalletUseCase } from './application/usecases/wallet/get-wallet.usecase';

// controller
import { AuthController } from './interfaces/controllers/auth.controller';
import { WalletController } from './interfaces/controllers/wallet.controller';

// routes
import { authRoutes } from './interfaces/routes/auth.routes';
import { walletRoutes } from './interfaces/routes/wallet.routes';
import { errorHandler } from './interfaces/middlewares/error.middleware';
// init
const userRepo = new MongoUserRepository();
const walletRepo = new MongoWalletRepository();

const registerUC = new RegisterUseCase(userRepo, walletRepo);
const loginUC = new LoginUseCase(userRepo);
const getWalletUC = new GetWalletUseCase(walletRepo);

const authController = new AuthController(registerUC, loginUC);
const walletController = new WalletController(getWalletUC);

// routes
app.use('/auth', authRoutes(authController));
app.use('/wallet', walletRoutes(walletController));
app.use(errorHandler);

const start = async () => {
  await connectMongo();
  const PORT = process.env.PORT || 3000;

  app.listen(3000, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
