import express from "express";
import productRoutes from "./Routes/productRoutes.js";
import { db } from "./database/db.js";
import OrderRoutes from "./Routes/OrderRoutes.js";
import dashboard from "./Routes/statsRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
app.use(express.json());

// Router

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1/dashboard", dashboard);

app.listen(5000, () => {
  console.log("server is started");
});

db();
