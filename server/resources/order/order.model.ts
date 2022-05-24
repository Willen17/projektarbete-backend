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
    customer: {
      type: String /*Schema.Types.ObjectId */,
      ref: "user",
      required: true,
    },
    products: { type: {} /*PRODUCT????*/, required: true },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: false },
    deliveryMethod: { type: String, ref: "deliveryOption", required: true },
    isOrderSent: { type: Boolean, default: false },
    address: { type: {} /* ADDRESS??? */, required: true },
    phoneNumber: { type: Number || String, required: true },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
