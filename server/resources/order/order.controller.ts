import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { OrderModel, Order } from "./order.model";

export const getAllOrders = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const orders = await OrderModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  res.status(200).json(orders);
};
export const addOrder = async (
  req: Request<{}, {}, Order>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    if (!req.session) return;
    let orderObj = req.body;
    let total =
      // orderObj = { ...orderObj, customer: req.session.user._id };
      console.log(orderObj);
    const order = new OrderModel(orderObj);
    // order.customer = req.session._id;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOneOrder = async (req: Request, res: Response) => {
  console.log("Kör request");
  const order = await OrderModel.findById(req.params.id);
  res.status(200).json(order);
};

export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const order = await OrderModel.findById(req.params.id);
  console.log(order);
  res.status(200).json(order);
};
export const deleteOrder = (req: Request, res: Response) => {
  res.status(200).json("DELETED ORDER");
};
