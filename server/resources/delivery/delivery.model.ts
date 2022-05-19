import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface DeliveryOption {
    title: string,
    imgURL: string,
    cost: number,
    deliveryTime: string
}

const deliveryOptionSchema = new mongoose.Schema(
  {
      title: {type : String, required: true},
      imgURL: {type: String, required: true},
      cost: {type: Number, required: true},
      deliveryTime: {type: String, required: true}
  }
);



export const DeliveryOptionModel = mongoose.model<DeliveryOption>("deliveryOption", deliveryOptionSchema);
