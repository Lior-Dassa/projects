import { Router } from "express";
import Balance from "../controllers/balance.js";
import getTransactions from "../controllers/get-transactions.js";
import postTransactions from "../controllers/post-transactions.js";
import { AccessTokenValidator, AmountValidator, EmailValidator, ToValidator , SameEmailValidator} from "../middleware/validators.js";
import GetUser from "../controllers/get-user.js";
import ValidationErrorSender from "../middleware/validation-error-sender.js";
const userRouter = new Router();

const postTransactionsValidators = [ToValidator, EmailValidator, AmountValidator, SameEmailValidator];

userRouter.use(AccessTokenValidator);
userRouter.get('/', GetUser);
userRouter.get('/balance', Balance);
userRouter.get('/transactions', getTransactions);
userRouter.post('/transactions',postTransactionsValidators, ValidationErrorSender, postTransactions);
export default userRouter;