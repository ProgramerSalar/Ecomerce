import mongoose from "mongoose";
import { NewUserProps } from "../types/type.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["User", "admin"],
      default: "User",
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<NewUserProps>("User", schema);
