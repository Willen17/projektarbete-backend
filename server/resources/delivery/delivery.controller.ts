import { NextFunction, Request, Response } from "express";
import { DeliveryOptionModel } from "./delivery.model";
export const getDeliveryOptions = async (req: Request, res: Response) => {
  const deliveryOptions = await DeliveryOptionModel.find({});
  res.status(200).json(deliveryOptions);
};
