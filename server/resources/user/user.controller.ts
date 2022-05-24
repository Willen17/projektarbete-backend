import { NextFunction, Request, Response } from "express";
import { UserModel, User } from "./user.model";
import bcrypt from "bcrypt";
import cookieSession from "cookie-session";

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const users = await UserModel.find({});
  res.status(200).json(users);
};
export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    let findUser = await UserModel.findOne({email: req.body.email});
    if(findUser) {
      console.log('user already exists')
      return res.status(409).send('Email already exists')
    }
    const user = new UserModel(req.body);
    await user.save();
    console.log(user.fullname);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  console.log("Kör request");
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
  if (!user) return res.status(404).send("ingen user");
  let matchPassword = await bcrypt.compare(req.body.password, user.password); // returns true or false
  if (!matchPassword) return res.status(401).json("Wrong username or password"); // if false
  if (req.session) {
    req.session.user = {_id: user._id, isAdmin: user.isAdmin};
  }
  console.log(req.session);

  res.json(user);
  // console.log("test");
  // const user = await UserModel.findOne({ email: req.body.email }).select(
  //   "password"
  // );
  // if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
  //   return res
  //     .status(401)
  //     .json("You have entered either an incorrect email or password.");
  // }
};

export const logoutUser = async (req: Request, res: Response) => {
  if (!req.session) return res.status(404).json("Ingen cookie");
  console.log(req.session.user);
  if (!req.session.user) return res.status(201).json("Du är inte inloggad");

  req.session = null;
  res.status(200).json("Utloggad");
};
