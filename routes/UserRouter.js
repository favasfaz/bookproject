import express from "express";
const router = express.Router();
import {
  addWishlist,
  getUserDeteils,
  googleLogin,
  replacingData
} from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.route("/addWishlist/:id").post(verifyToken, addWishlist);
router.route("/getUserDeteils/:id").get(verifyToken, getUserDeteils);
router.route("/").post(googleLogin);
router.route('/updatingData/:id').put(replacingData)

export default router;
