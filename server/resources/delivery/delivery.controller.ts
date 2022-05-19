import { NextFunction, Request, Response } from "express";
import { DeliveryOptionModel } from "./delivery.model";
export const getDeliveryOptions = async (req: Request, res: Response) => {
  console.log(req.session)
  // TODO: Who is allowed to use this endpoint?
  const deliveryOptions = await DeliveryOptionModel.find({})
  res.status(200).json(deliveryOptions);
};