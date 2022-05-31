import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

export const ErrorCodes = {
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  product_not_found: "product_not_found",
  session_not_initialized: "session_not_initialized",
  order_not_found: "order_not_found",
  out_of_stock: "out_of_stock",
  no_valid_inputs: "no_valid_inputs",
  wrong_user: "wrong_user",
  no_media: "no_media",
  email_taken: "email_taken",
} as const;

export const ErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(req.method, req.path, err);

  if (!(err instanceof Error)) {
    return res.status(500).json("unknown error");
  }

  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json(err.message);
  }

  if (err instanceof MongooseError.StrictModeError) {
    return res.status(400).json(err.message);
  }

  let statusCode = 500;
  let message = err.message;

  switch (err.message) {
    case ErrorCodes.forbidden: {
      statusCode = 403;
      message = "You are not allowed to access this resource";
      break;
    }
    case ErrorCodes.unauthorized: {
      statusCode = 401;
      message = "You most login to access this resource";
      break;
    }
    case ErrorCodes.session_not_initialized: {
      statusCode = 401;
      message = "No session active";
      break;
    }
    case ErrorCodes.out_of_stock: {
      statusCode = 404;
      message = "One product is out of stock, please recheck your cart.";
    }
    case ErrorCodes.no_valid_inputs: {
      statusCode = 404;
      message = "No valid inputs";
    }
    case ErrorCodes.wrong_user: {
      statusCode = 404;
      message = "Wrong Username or Password";
    }
    case ErrorCodes.no_media: {
      statusCode = 404;
      message = "No media found";
    }
    case ErrorCodes.email_taken: {
      statusCode = 401;
      message = "User with that email already exists";
    }
  }

  res.status(statusCode).json(message);
};
