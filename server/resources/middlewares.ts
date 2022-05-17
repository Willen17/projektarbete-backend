import { NextFunction, Request, Response } from "express";

/** Stops users that aren't logged in */
export const secure = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json("You must login");
  }
};

export const adminSecure = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user?.isAdmin) {
    next();
  } else {
    res.status(403).json("You don't have the rights to do this...");
  }
};
