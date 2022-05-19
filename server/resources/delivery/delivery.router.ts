import express from "express";
import { isLoggedIn } from "../middlewares";
import { getDeliveryOptions } from "./delivery.controller";

export const deliveryRouter = express
  .Router()
  .get("/deliveryOptions", isLoggedIn, getDeliveryOptions)