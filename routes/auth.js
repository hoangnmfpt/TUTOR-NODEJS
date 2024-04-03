import { Router } from "express";
import { login, register } from "../controllers/auth";
import { loginSchema, registerSchema } from "../validations/auth";
import validBodyRequest from "../middlewares/validRequestBody";
const authRouter = Router();

authRouter.post("/register", validBodyRequest(registerSchema), register);
authRouter.post("/login", validBodyRequest(loginSchema), login);

export default authRouter;
