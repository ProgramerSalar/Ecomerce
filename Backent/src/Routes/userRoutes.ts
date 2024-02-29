import express from "express";
import {
  Login,
  deleteUser,
  getSingleUser,
  getAllUser as getUser,
  putUser,
} from "../controllers/user.js";
import { upload } from "../middleware/multer.js";

const router = express();

router.post("/login", upload, Login);
router.get("/getUser", getUser);
router.route("/:id").get(getSingleUser).put(upload, putUser).delete(deleteUser);

export default router;
