import { Router } from "express";

import Login from "../controllers/login.js";
import { EmailValidator } from "../middleware/validators.js";
import ValidationErrorSender from "../middleware/validation-error-sender.js";

const loginRouter = Router();

const validators = [EmailValidator];

loginRouter.use(validators, ValidationErrorSender);

loginRouter.post('/', Login);

export default loginRouter;