import express from "express";
import { adminSecure, isCreator, isLoggedIn } from "../middlewares";
import {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOneOrder,
} from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/order", adminSecure, getAllOrders)
  .get("/order/:id", isCreator, getOneOrder)
  .post("/order", isLoggedIn, addOrder)
  .put("/order/:id", isCreator, updateOrder)
  .delete("/order/:id", adminSecure, deleteOrder);
