import express from "express";
import { adminSecure } from "../middlewares";
import { getAllUsers, addUser, updateUser, deleteUser } from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user", /* adminSecure, */ getAllUsers)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser);
