import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
