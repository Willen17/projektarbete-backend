import mongoose, { Schema, Types } from "mongoose";
import { Address } from "./address.schema";
import { Product, updateProduct } from "../product";
export interface Order {
  customer: Types.ObjectId;
  products: Product[];
  paymentMethod: string;
  total: number;
  deliveryMethod: string;
  isOrderSent: boolean;
  Address: Address;
}

const orderSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [{ type: {} /*PRODUCT????*/, required: true }],
    paymentMethod: [{ type: String, required: true }],
    total: { type: Number, required: true },
    deliveryMethod: { type: String, ref: "deliveryOption", required: true },
    isOrderSent: { type: Boolean, required: true },
    address: { type: {} /* ADDRESS??? */, required: true },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
