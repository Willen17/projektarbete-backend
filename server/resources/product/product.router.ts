import express from "express";
import { adminSecure } from "../middlewares";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getCategoryProducts,
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/product", getAllProducts)
  .get("/product/:id", getOneProduct)
  .get('/category/:category', getCategoryProducts)
  .post("/product", adminSecure, addProduct)
  .put("/product/:id", adminSecure, updateProduct)
  .delete("/product/:id", adminSecure, deleteProduct);
