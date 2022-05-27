import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { OrderModel, Order } from "./order.model";
import { ProductModel } from "../product";

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
    let orderObj: Order = req.body;

    for (let orderProduct of orderObj.products) {
      let findProduct = await ProductModel.findById(orderProduct._id);
      console.log(findProduct);
      if (!findProduct) return res.status(404).json("No product found");
      if (findProduct.stock < orderProduct.quantity!)
        return res
          .status(404)
          .json(
            `${
              orderProduct.title
            } stock is to low for you to order ${orderProduct.quantity!} of that product`
          );

      let updatedProduct = await ProductModel.findByIdAndUpdate(
        orderProduct._id,
        {
          stock: orderProduct.stock - orderProduct.quantity!,
        }
      );
      // let Findproduct = await ProductModel.findByIdAndUpdate(orderProduct._id,
      // {
      //   stock: orderProduct.stock - orderProduct.quantity!
      // }
      // )
      console.log(updatedProduct);
    }
    // let total =
    orderObj = { ...orderObj, customer: req.session.user._id };
    //   console.log(orderObj);
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
  // const order = await OrderModel.findByIdAndUpdate(req.params.id, {
  //   isOrderSent: req.body,
  // });
  const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(order);
};
export const deleteOrder = (req: Request, res: Response) => {
  res.status(200).json("DELETED ORDER");
};
