import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../order";
import { User } from "../user";
import { ProductModel, Product } from "./product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const products = await ProductModel.find({});

  res.status(200).json(products);
};
export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.status(200).json(product);
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const product = await ProductModel.findOneAndUpdate(
    { id_: req.params.id },
    req.body
  );
  res.status(200).json(req.body);
};
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  console.log(req.params.id);
  const product = await ProductModel.findByIdAndRemove(req.params.id);
  res.status(200).json("DELETED PRODUCT ");
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  let products = await ProductModel.find({ category: req.params.category });
  if (products.length < 1)
    return res.status(404).json("Inga produkter i den kategorin");
  res.status(200).json(products);
};
