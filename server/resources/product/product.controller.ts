import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../errorHandlers";
import { OrderModel } from "../order";
import { User } from "../user";
import { ProductModel, Product } from "./product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({});

  res.status(200).json(products);
};
export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.status(200).json(product);
};

export const getOneProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.status(200).json(product);
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const producti = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(req.body);
};
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  await ProductModel.findByIdAndRemove(req.params.id);
  res.status(200).json("DELETED PRODUCT ");
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  let products = await ProductModel.find({ category: req.params.category });
  res.status(200).json(products);
};

export const productNotFoundCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) throw new Error(ErrorCodes.product_not_found);
  next();
};
