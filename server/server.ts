import express from "express";
import mongoose from "mongoose";
import { userRouter, orderRouter, productRouter } from "./resources";
import "dotenv/config";

const app = express();

// Add global middlewares
app.use(express.json());

// Add routers
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
// Add more routers here....

// Connect to DB & start server
mongoose.connect(process.env.databas!, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection to database established!");
    app.listen(3000, () =>
      console.log("Server is running on http://localhost:3000")
    );
  }
});
