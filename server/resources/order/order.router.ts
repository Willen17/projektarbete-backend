import express from "express";
import { adminSecure, isCreator, secure } from "../middlewares";
import {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOneOrder,
} from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/order", getAllOrders)
  .get("/order/:id", isCreator, getOneOrder)
  .post("/order", secure, addOrder)
  .put("/order/:id", isCreator, updateOrder)
  .delete("/order/:id", adminSecure, deleteOrder);
