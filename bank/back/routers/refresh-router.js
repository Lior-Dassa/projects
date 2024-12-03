import { Router } from "express";
import RefreshToken from "../controllers/refresh-token.js";
import { RefreshTokenValidator } from "../middleware/validators.js";

const refreshRouter = new Router();

refreshRouter.use(RefreshTokenValidator);
refreshRouter.get('/', RefreshToken);

export default refreshRouter;