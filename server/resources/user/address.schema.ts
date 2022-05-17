import mongoose from "mongoose";

export interface Address {
  street: string;
  zipcode: number;
  city: string;
}

export const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
});
