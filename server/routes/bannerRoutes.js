import express from "express";
import {
    
    createBannerController,
    getBannerController,
    bannerBgController,
    deleteBannerController,
} from "../controllers/bannerController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-banner",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-banner/:bid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get banners
router.get("/get-banner", getBannerController);

//delete rproduct
router.delete("/delete-banner/:bid", deleteBannerController);

export default router;
