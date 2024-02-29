import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";
import { calculatePercentage } from "../utils/feature.js";

export const getdashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const today = new Date();

  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth()),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1),
    end: new Date(today.getFullYear(), today.getMonth()),
  };

  // console.log(lastMonth)
  // console.log(thisMonth)

  const thisMonthUserPromise = await User.find({
    createdAt: {
      $gt: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  // console.log(user.length)

  const lastMonthUserPromise = await User.find({
    createdAt: {
      $gt: lastMonth.start,
      $lte: lastMonth.end,
    },
  });
  // console.log(lastMonthUser.length)

  const thisMonthProductPromise = await Product.find({
    createdAt: {
      $gt: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  // console.log(thisMonthProduct.length)

  const lastMonthProductPromise = await Product.find({
    createdAt: {
      $gt: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  // console.log(lastMonthProduct.length)

  const thisMonthOrderPromise = await Order.find({
    createdAt: {
      $gt: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  // console.log(thisMonthOrder.length)

  const lastMonthOrderPromise = await Order.find({
    createdAt: {
      $gt: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const [
    thisMonthUser,
    lastMonthUser,
    thisMonthProduct,
    lastMonthProduct,
    thisMonthOrder,
    lastMonthOrder,
  ] = await Promise.all([
    thisMonthUserPromise,
    lastMonthUserPromise,
    thisMonthProductPromise,
    lastMonthProductPromise,
    thisMonthOrderPromise,
    lastMonthOrderPromise,
  ]);

  // find the revnew in order section
  const thisMonthOrderRevenew = thisMonthOrder.reduce(
    (total, order) => total + (order.total || 0),
    0
  );
  // console.log(thisMonthOrderRevenew)

  const lastMonthOrderRevenew = lastMonthOrder.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  // console.log(lastMonthOrderRevenew)

  const percent = {
    revenue: calculatePercentage(thisMonthOrderRevenew, lastMonthOrderRevenew),
    user: calculatePercentage(thisMonthUser.length, lastMonthUser.length),
    product: calculatePercentage(
      thisMonthProduct.length,
      lastMonthProduct.length
    ),
    order: calculatePercentage(thisMonthOrder.length, lastMonthOrder.length),
  };

  const totalUser = await User.find().countDocuments();
  const totalProduct = await Product.find().countDocuments();
  const totalRevenue = await Order.find({}).select("total");
  const totalOrder = totalRevenue.length;

  const totalRevenueCount = totalRevenue.reduce(
    (total, order) => total + (order.total || 0),
    0
  );
  // console.log(totalRevenueCount)

  const total = {
    totalRevenueCount,
    totalUser,
    totalProduct,
    totalOrder,
  };

  const lastsixMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 6),
    end: today,
  };
  // console.log(sixMonth)

  const SixMonthOrder = await Order.find({
    createdAt: {
      $gt: lastsixMonth.start,
      $lte: lastsixMonth.end,
    },
  });

  // console.log(SixMonthOrder);

  const lastsixMonthOrder = new Array(6).fill(0);
  const lastsixMonthRevenue = new Array(6).fill(0);

  SixMonthOrder.forEach((order) => {
    const createdDate = order.createdAt;
    // console.log(createdDate)
    const monthDiff = today.getMonth() - createdDate.getMonth();
    // console.log(monthDiff)

    if (monthDiff < 6) {
      lastsixMonthOrder[6 - monthDiff - 1] += 1;
      lastsixMonthRevenue[6 - monthDiff - 1] += order.total;
    }
  });

  // console.log(lastsixMonthOrder)
  // console.log(lastsixMonthRevenue)

  // Inventery section

  const categories = await Product.distinct("category");
  // console.log(categories.length)

  const categoryCountPromise = categories.map((category) =>
    Product.countDocuments({ category })
  );
  const categoryCount = await Promise.all(categoryCountPromise);
  // console.log(categoryCount)

  const categoriesCount: Record<string, number>[] = [];

  categories.forEach((category, index) => {
    categoriesCount.push({
      [category]: (categoryCount[index] / totalProduct) * 100,
    });
  });
  // console.log(categoriesCount)

  // calculate gender

  const totalGender = await User.distinct("gender");
  // console.log(totalGender)

  const calculateGenderPromise = totalGender.map((gender) =>
    User.countDocuments({ gender })
  );
  // console.log(calculateGender)

  const AllGender = await Promise.all(calculateGenderPromise);
  // console.log(AllGender)

  const calculateGender: Record<string, number>[] = [];

  totalGender.forEach((g, i) => {
    calculateGender.push({
      [g]: AllGender[i],
    });
  });
  // console.log(calculateGender)

  // Top Transation
  const lastestTransaction = await Order.find({})
    .select(["orderItems", "discount", "total", "status"])
    .limit(4);
  // console.log(lastestTransaction)

  const calculateTransaction = lastestTransaction.map((i) => ({
    _id: i._id,
    quantity: i.orderItems.length,
    discount: i.discount,
    amount: i.total,
    status: i.status,
  }));
  // console.log(calculateTransaction)

  const stats = {
    percent,
    total,
    categoriesCount,
    calculateGender,
    calculateTransaction,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
};

export const getPieCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // product categories ratio
  const categories = await Product.distinct("category");
  // console.log(categories)

  const categoriesCountPromise = categories.map((category) =>
    Product.countDocuments({ category })
  );
  // console.log(categoriesCount)
  const categoriesCount = await Promise.all(categoriesCountPromise);
  // console.log(categoriesCount)

  const CategoryCount: Record<string, number>[] = [];

  categories.forEach((category, index) => {
    CategoryCount.push({
      [category]: categoriesCount[index],
    });
  });
  // console.log(CategoryCount)

  const [
    orderProcessing,
    orderShipped,
    orderDeliverd,
    productCount,
    OutofStock,
  ] = await Promise.all([
    Order.countDocuments({ status: "Processing" }),
    Order.countDocuments({ status: "Shipped" }),
    Order.countDocuments({ status: "Deliverd" }),
    Product.countDocuments(),
    Product.countDocuments({ stock: 0 }),
  ]);

  // console.log(orderProcessing)
  // console.log(orderShipped)
  // console.log(orderDeliverd)

  const orderFullFillRatio = {
    orderProcessing,
    orderShipped,
    orderDeliverd,
  };

  // stock avaiLabiltiy
  const stockAvailability = {
    inStock: productCount - OutofStock,
    OutofStock,
  };
  // console.log(stockAvailability.inStock)
  // console.log(OutofStock)

  // Revenue Distribution

  const AllOrders = await Order.find({}).select([
    "total",
    "discount",
    "subtotal",
    "tax",
    "shippingCharges",
  ]);
  // console.log(AllOrders)

  // we will calculate [ discount, productioncost, burn, marketingcost, netmargin ]

  const grossIncome = AllOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );
  // console.log(grossIncome)

  const discount = AllOrders.reduce(
    (discount, order) => discount + (order.discount || 0),
    0
  );
  // console.log(discount)

  const productionCost = AllOrders.reduce(
    (shippingCharges, order) => shippingCharges + (order.shippingCharges || 0),
    0
  );
  // console.log(productionCost)

  const burn = AllOrders.reduce((burn, order) => burn + (order.tax || 0), 0);
  // console.log(burn)

  const marketingcost = grossIncome * (30 / 100);
  // console.log(marketingcost)

  const netmargin =
    grossIncome - discount - productionCost - burn - marketingcost;
  // console.log(netmargin)

  const revinewDistribution = {
    discount,
    productionCost,
    burn,
    marketingcost,
    netmargin,
  };
  // console.log(revinewDistribution)

  // Users Age Group

  // const allUsers = await User.find({}).select(["dob"])
  // console.log(allUsers)

  function age(birthdate: Date) {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    return age;
  }

  const allUsers = await User.find({}).select(["dob"]);

  const allUsersWithAge = allUsers.map((user) => {
    return {
      dob: user.dob,
      age: age(user.dob),
    };
  });

  const usersAgeGroup = {
    teen: allUsersWithAge.filter((user) => user.age < 20).length,
    adult: allUsersWithAge.filter((user) => user.age >= 20 && user.age <= 40)
      .length,
    old: allUsersWithAge.filter((user) => user.age >= 40).length,
  };

  // This logs the result
  // console.log(usersAgeGroup.teen);
  // console.log(usersAgeGroup.adult);
  // console.log(usersAgeGroup.old)
  // console.log(usersAgeGroup)

  // user Admin ratio
  const adminCount = await User.countDocuments({ role: "admin" });
  // console.log(adminCount)

  const userCount = await User.countDocuments({ role: "User" });
  // console.log(userCount)

  const userAdminCount = {
    admin: adminCount,
    user: userCount,
  };

  const stats = {
    orderFullFillRatio,
    CategoryCount,
    stockAvailability,
    revinewDistribution,
    usersAgeGroup,
    userAdminCount,
  };

  res.status(200).json({
    success: true,
    stats,
  });
};

export const getBarCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  console.log("hello world")
};
