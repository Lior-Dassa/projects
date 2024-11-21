import './utils/config.js';
import express from "express";

import signupRouter from "./routers/signup-router.js";
import loginRouter from "./routers/login-routher.js";
import userRouter from "./routers/user-router.js";
import Refresh from "./controllers/refresh-token.js";

const app = express();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

app.use(express.json());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.get('/refresh', Refresh);


app.listen(PORT, HOSTNAME, () => {
  console.log(`Express server running at http://${HOSTNAME}:${PORT}/`);
});