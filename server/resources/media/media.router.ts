import express from "express";
import multer from "multer";
import { adminSecure } from "../middlewares";
import { getMedia, addMedia, deleteMedia } from "./media.controller";

const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/media/:id", getMedia)
  .post("/media", adminSecure, upload.single("media"), addMedia)
  .delete("/media/:id", adminSecure, deleteMedia);
