import { NextFunction, Request, Response } from "express";
import { OrderModel } from "./order";

/** Stops users that aren't logged in */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) return res.status(404).json("Ingen cookie");
  if (!req.session.user) return res.status(401).json("Logga in för att använda");

  next();
};

export const isCreator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) return res.status(404).json("Ingen cookie");
  if (!req.session.user) return res.status(404).json("Du måste logga in för att kolla ordrar");
  let order = await OrderModel.findById(req.params.id);
  if (!order) return res.status(403).json('Finns ingen order med det ID:t');
  let isAdmin = req.session.user.isAdmin === true;
  let checkOrderCustomer = order.customer._id == req.session.user._id;
  if (!isAdmin) {
    if (!checkOrderCustomer) return res.status(404).json("Inte tillgång till denna order");
    next()
  } else {
    next()
  }
};

export const adminSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.session) return res.status(404).json('No cookie')
  if(!req.session.user) return res.status(403).json('Du måste logga in')
  console.log(req.session.user)
  if(!req.session.user.isAdmin) return res.status(403).json('Du måste vara admin för göra detta')
  next()
};
