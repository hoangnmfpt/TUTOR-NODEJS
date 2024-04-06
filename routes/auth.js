import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import validBodyRequest from "../middlewares/validRequestBody.js";
const authRouter = Router();

authRouter.post("/register", validBodyRequest(registerSchema), register);
authRouter.post("/login", validBodyRequest(loginSchema), login);

export default authRouter;
