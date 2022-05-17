import mongoose from "mongoose";
import { Address, addressSchema } from "./address.schema";

export interface User {
  firstname: string;
  lastname: string;
  /** Virtual */ fullname: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
}

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
    address: { type: addressSchema, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("fullname").get(function (this: User) {
  return this.firstname + " " + this.lastname;
});

userSchema.pre("save", encryptPassword);
userSchema.pre("updateOne", encryptPassword);

function encryptPassword(this: User, next: Function) {
  this.password = "qwerty"; // TODO: use bcrypt...
  next();
}

export const UserModel = mongoose.model<User>("user", userSchema);
