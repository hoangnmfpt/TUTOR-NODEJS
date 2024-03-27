import jwt from "jsonwebtoken";
import { errorMessages, successMessages } from "../constants/message";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { validBody } from "../utils/validBody";
import { loginSchema, registerSchema } from "../validations/auth";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const resultValid = validBody(req.body, registerSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }

    // ? B2: Kiem tra email da ton tai chua?
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: errorMessages.EMAIL_EXIST });
    }

    // B3: Ma hoa mat khau
    const hashPass = await hashPassword(password);
    // B4: Tao user moi

    const user = await User.create({ ...req.body, password: hashPass });
    user.password = undefined;
    return res.status(201).json({
      message: successMessages.REGISTER_SUCCESS,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * ? B1: Kiem tra email va password
     * ? B2: Kiem tra email co ton tai khong?
     * ? B3: Kiem tra password co khop khong?
     * ? B4: Tao token -> JWT
     * ? B5: Tra ve token cho client
     */

    const { email, password } = req.body;
    const resultValid = validBody(req.body, loginSchema);
    if (resultValid) {
      return res.status(400).json({ message: resultValid.errors });
    }

    // ? B2: Kiem tra email co ton tai khong?
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: errorMessages.EMAIL_NOT_FOUND });
    }

    // ? B3: Kiem tra password co khop khong?
    console.log(await comparePassword(password, userExist.password));
    if (!(await comparePassword(password, userExist.password))) {
      return res.status(400).json({ message: errorMessages.INVALID_PASSWORD });
    }

    // ? B4: Tao token -> JWT (JSON Web Token)
    const token = jwt.sign({ id: userExist._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // ? B5: Tra ve token cho client
    userExist.password = undefined;
    return res.status(201).json({
      message: successMessages.LOGIN_SUCCESS,
      token,
      userExist,
    });
  } catch (error) {
    next(error);
  }
};
