import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  image: string;
  imageId: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  _id: string;
  stock: number;
  category: string[];
}

const productSchema = new mongoose.Schema<Product>(
  {
    imageId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: [{ type: String, required: true }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("imageURL").get(function () {
  return "/api/media/" + this.imageId;
});

export const ProductModel = mongoose.model("product", productSchema);
