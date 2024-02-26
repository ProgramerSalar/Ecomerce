import { Request, Response, NextFunction } from "express";
import { NewOrderRequestProps } from "../types/type.js";
import { Order } from "../models/order.js";
import { reduceStock } from "../utils/feature.js";

export const NewOrder = async (
  req: Request<{}, {}, NewOrderRequestProps>,
  res: Response,
  next: NextFunction
) => {
  const {
    shippingInfo,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
    orderItems,
  } = req.body;

//   console.log(shippingInfo);
//   console.log(subtotal, tax, shippingCharges, discount, total);
//   console.log(orderItems);

  const orders = await Order.create({
    shippingInfo,
    subtotal,
    tax,
    shippingCharges,
    discount,
    total,
    orderItems,
  });

  await reduceStock(orderItems)

  res.status(200).json({
    success: true,
    orders,
  });
};
