import express from "express";
import { adminSecure, isLoggedIn } from "../middlewares";
import {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  orderNotFoundCheck,
} from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/order", adminSecure, getAllOrders)
  .get("/order/:id", isLoggedIn, orderNotFoundCheck, getUserOrders)
  .post("/order", isLoggedIn, addOrder)
  .put("/order/:id", adminSecure, orderNotFoundCheck, updateOrder)
  .delete("/order/:id", adminSecure, orderNotFoundCheck, deleteOrder);
