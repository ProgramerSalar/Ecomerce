import e, { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserProps } from "../types/type.js";
import { rm } from "fs";

export const Login = async (
  req: Request<{}, {}, NewUserProps>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, gender, dob } = req.body;

  const photo = req.file?.filename;
  // console.log(photo)

  const user = await User.create({
    name,
    email,
    gender,
    dob,
    photo,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.find({});
  res.status(200).json({
    success: true,
    user,
  });
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
};

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) throw new Error("Please Enter ID");
  const { name, email, gender, dob } = req.body;

  const photo = req.file?.filename;
  console.log("photo", photo);

  const user = await User.findById(id);
  if (!user) throw new Error("User Not Found");

  if (name) user.name = name;
  if (email) user.email = email;
  if (gender) user.gender = gender;
  if (dob) user.dob = dob;
  if (photo) {
    rm(user.photo, () => {});
    user.photo = photo;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    user,
  });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if(!user) throw new Error("user not found")
  await user.deleteOne()





  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
};
