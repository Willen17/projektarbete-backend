import express from "express";
import { isLoggedIn } from "../middlewares";
import { getDeliveryOptions } from "./delivery.controller";

export const deliveryRouter = express
  .Router()
  .get("/deliveryOptions", getDeliveryOptions);
// Should have isLoggedIn as middleware, removed it to test. Put back later.