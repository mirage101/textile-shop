import express from "express";
import {
  createInfoPageController,
  getInfoPagesController,
  deleteInfoPageController,
  updateInfoPageController,
  getInfoPageController,
} from "../controllers/infopageController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
router.post(
  "/create-infopage",
  requireSignIn,
  isAdmin,
  createInfoPageController
);
//routes
router.put(
  "/update-infopage/:id",
  requireSignIn,
  isAdmin,
  updateInfoPageController
);

//get products
router.get("/get-infopages", getInfoPagesController);

//single product
router.get("/get-infopage/:slug", getInfoPageController);

//delete rproduct
router.delete("/delete-infopage/:id", deleteInfoPageController);

// //product per page
// router.get("/product-list/:page", productListController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

//payments routes
//token

export default router;
