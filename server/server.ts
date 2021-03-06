import express from "express";
require("express-async-errors");
import mongoose from "mongoose";
import {
  userRouter,
  orderRouter,
  productRouter,
  deliveryRouter,
} from "./resources";
import "dotenv/config";
import cookieSession from "cookie-session";
import { mediaRouter } from "./resources/media/media.router";
import { ErrorHandler } from "./resources/errorHandlers";

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    secret: "aVeryS3cr3tK3y",
    sameSite: "strict",
    httpOnly: false,
    secure: false,
    maxAge: 1000 * 60000, // 1000 mins for now
  })
);
// Add routers
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api", deliveryRouter);
app.use("/api", mediaRouter);
// Add more routers here....

app.use(ErrorHandler);

// Connect to DB & start server
mongoose.connect(process.env.databas!, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection to database established!");
    app.listen(3001, () =>
      console.log("Server is running on http://localhost:3001")
    );
  }
});
