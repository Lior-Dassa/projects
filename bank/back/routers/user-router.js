import { Router } from "express";
import Balance from "../controllers/balance.js";
import getTransactions from "../controllers/get-transactions.js";
import postTransactions from "../controllers/post-transactions.js";

const userRouter = new Router();

userRouter.get('/balance', Balance);
userRouter.get('/transactions', getTransactions);
userRouter.post('/transactions', postTransactions);
export default userRouter;