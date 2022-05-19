import express from "express";
import mongoose from "mongoose";
import { userRouter, orderRouter, productRouter, deliveryRouter } from "./resources";
import "dotenv/config";
import cookieSession from "cookie-session";

const app = express();

// Add global middlewares
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
app.use("/api", deliveryRouter)
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
