import { errorMessages } from "../constants/message.js";

const validBodyRequest = (schema) => async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({
        message: errorMessages.INVALID_BODY_REQUEST,
        errors,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validBodyRequest;
