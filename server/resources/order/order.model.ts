import mongoose, { Schema, Types } from "mongoose";

export interface Order {
  customer: Types.ObjectId;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
