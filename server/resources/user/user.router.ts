import express from "express";
import { adminSecure, isLoggedIn } from "../middlewares";
import {
  getAllUsers,
  addUser,
  deleteUser,
  getOneUser,
  loginUser,
  logoutUser,
  checkIsLoggedIn,
  editUser,
} from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user/login", checkIsLoggedIn)
  .get("/user", adminSecure, getAllUsers)
  .get("/user/:id", adminSecure, getOneUser)
  .put("/user/:id", adminSecure, editUser)
  .post("/user", addUser)
  .post("/login", loginUser)
  .delete("/logout", logoutUser)
  .delete("/user/:id", adminSecure, deleteUser);
