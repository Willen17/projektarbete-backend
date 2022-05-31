import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session";
import { ErrorCodes } from "../errorHandlers";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};
export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  let findUser = await UserModel.findOne({ email: req.body.email });
  if (findUser) throw new Error(ErrorCodes.email_taken);
  const user = new UserModel(req.body);
  await user.save();
  if (req.session) {
    req.session.user = {
      _id: user._id,
      name: user.fullname,
      isAdmin: user.isAdmin,
    };
  }
  res.status(200).json(user);
};

export const getOneUser = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json("DELETED USER");
};

export const loginUser = async (req: Request, res: Response) => {
  let user = await UserModel.findOne({ email: req.body.email }).select(
    "password"
  );
  if (!user) throw new Error(ErrorCodes.no_valid_inputs);
  let matchPassword = await bcrypt.compare(req.body.password, user.password); // returns true or false
  if (!matchPassword) throw new Error(ErrorCodes.wrong_user); // if false
  if (req.session) {
    req.session.user = {
      _id: user._id,
      name: user.fullname,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
    };
  }

  res.json(user);
};

export const editUser = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.body) throw new Error(ErrorCodes.no_valid_inputs);
  const user = await UserModel.findByIdAndUpdate(req.params.id, {
    isApplyingForAdmin: req.body.isApplyingForAdmin,
    isAdmin: req.body.isAdmin,
  });

  res.status(200).json("User status changed");
};

export const checkIsLoggedIn = async (req: Request, res: Response) => {
  if (!req.session) throw new Error(ErrorCodes.session_not_initialized);
  if (!req.session.user) throw new Error(ErrorCodes.unauthorized);
  res.status(200).json(req.session);
};

export const logoutUser = async (req: Request, res: Response) => {
  if (!req.session) throw new Error(ErrorCodes.session_not_initialized);
  if (!req.session.user) throw new Error(ErrorCodes.unauthorized);

  req.session = null;
  res.status(200).json("Utloggad");
};
