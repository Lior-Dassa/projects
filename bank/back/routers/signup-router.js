import { Router } from "express";

import Signup from "../controllers/signup.js";
import { EmailValidator, PhoneValidator, NameValidator } from "../middleware/validators.js";
import ValidationErrorSender from "../middleware/validation-error-sender.js";
import Confirmation from "../controllers/confirmation.js";
import Resend from "../controllers/resend.js";

const signupRouter = Router();

const signUpValidators = [EmailValidator, PhoneValidator, NameValidator];
const resendValidators = [EmailValidator, PhoneValidator];

signupRouter.post('/', signUpValidators, ValidationErrorSender, Signup);
signupRouter.post('/confirmation', Confirmation);
signupRouter.post('/resend', resendValidators, ValidationErrorSender, Resend);

export default signupRouter;
