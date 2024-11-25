import { Router } from "express";
import Balance from "../controllers/balance.js";
import getTransactions from "../controllers/get-transactions.js";
import postTransactions from "../controllers/post-transactions.js";
import { AccessTokenValidator, AmountValidator, EmailValidator, ToValidator, TransactionValidator } from "../middleware/validators.js";

const userRouter = new Router();

const postTransactionsValidators = [ToValidator, EmailValidator, AmountValidator];

userRouter.use(AccessTokenValidator);
userRouter.get('/balance', Balance);
userRouter.get('/transactions', getTransactions);
userRouter.post('/transactions',postTransactionsValidators, TransactionValidator , postTransactions);
export default userRouter;