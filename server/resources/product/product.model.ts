import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
  _id: string;
  stock: number;
  category: string[];
}

const productSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<Product>("product", productSchema);
