import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  usersController,
  deleteUserController,
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
  changeRoleController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Register || Method POST
router.put("/users/:id", requireSignIn, isAdmin, changeRoleController);
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//get users
router
  .get("/users", requireSignIn, isAdmin, usersController)
  .delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

// router.post("/wishlist/:productId", addToWishlist);
router.delete(
  "/users/:userId/wishlist/:productId",
  requireSignIn,
  removeFromWishlist
);

router.post("/wishlist/:productId", addToWishlist);
// router.get("/users/:id/wishlist", getUserWishlist);
router.get("/users/:userId/wishlist", requireSignIn, getUserWishlist);

export default router;
