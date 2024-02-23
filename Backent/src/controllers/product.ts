import { Request, Response, NextFunction } from "express";
import { rm } from "fs";
import { Product } from "../models/product.js";
import { newProductProps } from "../types/type.js";

export const newProduct = async (
  req: Request<{}, {}, newProductProps>,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, category } = req.body;

  const photo = req.file;

  if (!photo) {
    return res.status(200).json({
      success: false,
      message: "Please Enter Photo",
    });
  }

  if (!name || !price || !stock || !category) {
    rm(photo.path, () => {});
    return res.status(200).json({
      success: false,
      message: "Please Enter All Fields",
    });
  }

  const product = await Product.create({
    name,
    price,
    stock,
    category,
    photo: photo.path,
  });

  return res.status(200).json({
    success: true,
    message: "Product Created Successfully",
  });
};

export const getLatestProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.find({})
    .sort({
      createdAt: -1,
    })
    .limit(10);

  return res.status(200).json({
    success: true,
    product,
  });
};

export const getAdminProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.find({});
  return res.status(200).json({
    success: true,
    product,
  });
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await Product.distinct("category");
  return res.status(200).json({
    success: true,
    categories,
  });
};

export const getUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Invalid Id",
    });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(200).json({
      success: false,
      message: "Invalid Id",
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
};

export const PutUserProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const { name, price, stock, category } = req.body;
    // console.log(name, price, stock, category);
    const photo = req.file?.path;

    const product = await Product.findById(id);
    // console.log(product);
    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product not found",
      });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    if (photo) {
      rm(product.photo, () => {});
      product.photo = photo;
    }

    // console.log(product)

    await product.save();
    // console.log(product);

    res.status(200).json({
      success: true,
      message: "SuccessfUlly Updated Product",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletedProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const product = Product.findById(id);
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "SuccessfUlly deleted Product",
  });
};
