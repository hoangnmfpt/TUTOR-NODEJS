import { errorMessages } from "../constants/message.js";

export const errorHandler = (err, req, res) => {
  return res.status(err.status || 500).json({
    error: {
      name: err.name,
      message: err.message || errorMessages.ERROR_SERVER,
    },
  });
};

// ! monitoring

export const errorHandlerNotFound = (req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
};
