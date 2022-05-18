import { NextFunction, Request, Response } from "express";
import { OrderModel } from "./order";

/** Stops users that aren't logged in */
export const secure = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) return res.status(404).json("Ingen cookie");
  if (!req.session.user)
    return res.status(401).json("Logga in för att använda");

  next();
};

export const isCreator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware körs");
  if (!req.session) return res.status(404).json("Ingen cookie");
  if (!req.session.user)
    return res.status(404).json("Du måste logga in för att kolla ordrar");
  let isAdmin = req.session.user.isAdmin === true;
  let order = await OrderModel.findById(req.params.id);
  if (!order) return;
  let checkOrderCustomer = order.customer._id == req.session.user._id;
  console.log(isAdmin);
  if (!isAdmin) {
    if (!checkOrderCustomer)
      return res.status(404).json("Inte tillgång till denna order");
    return res.status(200).json(order);
  } else {
    return res.status(200).json(order);
  }
};

export const adminSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user?.isAdmin) {
    next();
  } else {
    res.status(403).json("You don't have the rights to do this...");
  }
};
