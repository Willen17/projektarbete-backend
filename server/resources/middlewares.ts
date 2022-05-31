import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "./errorHandlers";
import { OrderModel } from "./order";

/** Stops users that aren't logged in */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) throw new Error(ErrorCodes.session_not_initialized);
  if (!req.session.user) throw new Error(ErrorCodes.unauthorized);
  next();
};

export const adminSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) throw new Error(ErrorCodes.session_not_initialized);
  if (!req.session.user) throw new Error(ErrorCodes.unauthorized);
  if (!req.session.user.isAdmin) throw new Error(ErrorCodes.forbidden);
  next();
};
