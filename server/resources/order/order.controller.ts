import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { OrderModel, Order } from "./order.model";
import { ProductModel } from "../product";
import { ErrorCodes } from "../errorHandlers";

export const getAllOrders = async (req: Request, res: Response) => {
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
  if (!req.session) throw new Error(ErrorCodes.session_not_initialized);
  let orderObj: Order = req.body;

  for (let orderProduct of orderObj.products) {
    let findProduct = await ProductModel.findById(orderProduct._id);

    if (findProduct!.stock < orderProduct.quantity!)
      throw new Error(ErrorCodes.out_of_stock);

    let updatedProduct = await ProductModel.findByIdAndUpdate(
      orderProduct._id,
      {
        stock: orderProduct.stock - orderProduct.quantity!,
      }
    );
  }

  orderObj = { ...orderObj, customer: req.session.user._id };
  const order = new OrderModel(orderObj);
  await order.save();
  res.status(200).json(order);
};

export const getUserOrders = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  if (req.params.id !== req.session?.user._id) {
    throw new Error(ErrorCodes.unauthorized);
  }
  const orders = await OrderModel.find({ customer: req.params.id });
  // console.log(orders);
  res.status(200).json(orders);
};

export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(order);
};
export const deleteOrder = (req: Request, res: Response) => {
  res.status(200).json("DELETED ORDER");
};

export const orderNotFoundCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let order = await OrderModel.findById(req.params.id);
  if (!order) throw new Error(ErrorCodes.order_not_found);
  next();
};
