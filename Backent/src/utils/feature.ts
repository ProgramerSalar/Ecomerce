import { Product } from "../models/product.js";
import { orderItemsRequestProps } from "../types/type.js";

export const reduceStock = async (orderItems: orderItemsRequestProps[]) => {
  for (let index = 0; index < orderItems.length; index++) {
    const order = orderItems[index];
    const product = await Product.findById(order.productId);
    if (!product) throw Error("Product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};

export const calculatePercentage = (thisMonth:number, lastMonth:number) => {


  if(lastMonth === 0) return (thisMonth/100)*100
  const percent = ((thisMonth - lastMonth)/lastMonth)*100
  return percent.toFixed(0)
  
  
}


