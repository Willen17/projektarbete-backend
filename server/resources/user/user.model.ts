import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  firstname: string;
  lastname: string;
  /** Virtual */ fullname: string;
  password: string;
  isAdmin: boolean;
  isApplyingForAdmin: boolean;
  email: string;
}

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, select: true },
    lastname: { type: String, required: true, select: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false, select: true },
    isApplyingForAdmin: {
      type: Boolean,
      required: true,
      default: false,
      select: true,
    },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullname").get(function (this: User) {
  return this.firstname + " " + this.lastname;
});

userSchema.pre("save", encryptPassword);
userSchema.pre("updateOne", encryptPassword);

async function encryptPassword(this: User, next: Function) {
  this.password = await bcrypt.hash(this.password, 10); // TODO: use bcrypt...

  next();
}

export const UserModel = mongoose.model<User>("user", userSchema);
