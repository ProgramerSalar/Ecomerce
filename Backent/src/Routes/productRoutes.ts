import express from "express";
import { upload } from "../middleware/multer.js";
import {
  PutUserProduct,
  deletedProduct,
  getAdminProduct,
  getAllCategories,
  getLatestProduct,
  getUserProduct,
  newProduct,
} from "../controllers/product.js";

const router = express();

router.post("/newProduct", upload, newProduct);
router.get("/getLatestProduct", getLatestProduct);
router.get("/getAdminProduct", getAdminProduct);
router.get("/getAllCategories", getAllCategories);
router
  .route("/UserProduct/:id")
  .get(getUserProduct)
  .put(upload, PutUserProduct)
  .delete(deletedProduct);

export default router;

// 65d81548fbdbc3e76cac69b3
// 65d87bf2b918ad5f8222e094
