import express from "express";
import productRoutes from './Routes/productRoutes.js';
import { db } from "./database/db.js";
const app = express();
app.use(express.json());
// Router 
app.use('/api/v1/product', productRoutes);
app.listen(5000, () => {
    console.log("server is started");
});
db();
