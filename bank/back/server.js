import './utils/config.js';
import express from "express";
import cors from 'cors';
import signupRouter from "./routers/signup-router.js";
import loginRouter from "./routers/login-routher.js";
import userRouter from "./routers/user-router.js";
import refreshRouter from "./routers/refresh-router.js";

const app = express();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/refresh', refreshRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Express server running at http://${HOSTNAME}:${PORT}/`);
});