import mongoose from "mongoose";


interface ProductProps{
  name:string;
  photo:string;
  price:number;
  stock:number;
  category:string;
  createdAt:Date;
  updatedAt:Date;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    photo: {
      type: String,
      required:[true, "Please ENter Photo"]
    },
    price: {
      type: Number,
      required: [true, "Please Enter price"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please ENTer Category"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<ProductProps>("Product", schema);
