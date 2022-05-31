import express from "express";
import { adminSecure } from "../middlewares";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getCategoryProducts,
  productNotFoundCheck,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/product", getAllProducts)
  .get("/product/:id", productNotFoundCheck, getOneProduct)
  .get("/category/:category", getCategoryProducts)
  .post("/product", adminSecure, addProduct)
  .put("/product/:id", adminSecure, productNotFoundCheck, updateProduct)
  .delete("/product/:id", adminSecure, productNotFoundCheck, deleteProduct);
