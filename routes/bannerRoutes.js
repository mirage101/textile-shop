import express from "express";
import {    
    createBannerController,
    getBannerController,
    updateBannerController,
    bannerBgController,
    deleteBannerController,
    getSingleBannerController
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
  createBannerController
);
//routes
router.put(
  "/update-banner/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateBannerController
);

//get banners
router.get("/", getBannerController);

//get banner bg
router.get("/background/:id", bannerBgController);

//delete rproduct
router.delete("/:id", deleteBannerController);

//single banner
router.get("/get-banner/:id", getSingleBannerController);

export default router;
