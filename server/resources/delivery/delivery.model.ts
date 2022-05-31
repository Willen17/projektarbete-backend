import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface DeliveryOption {
  title: string;
  imageURL: string;
  imgId: Types.ObjectId;
  cost: number;
  deliveryTime: string;
}

const deliveryOptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imgId: { type: Schema.Types.ObjectId, required: true },
  cost: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
deliveryOptionSchema.virtual("imageURL").get(function () {
  return "/api/media/" + this.imgId;
});

export const DeliveryOptionModel = mongoose.model<DeliveryOption>(
  "deliveryOption",
  deliveryOptionSchema
);
