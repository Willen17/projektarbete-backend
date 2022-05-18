import express from "express";
import { adminSecure } from "../middlewares";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/product", /* adminSecure, */ getAllProducts)
  .post("/product", addProduct)
  .put("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct);
