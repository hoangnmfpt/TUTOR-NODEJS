import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const generateToken = (payload, expiresIn = "10d") =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
