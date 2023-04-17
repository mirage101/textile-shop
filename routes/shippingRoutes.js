import express from "express";
import {
  createShippingMethod,
  getShippingMethods,
  getShippingMethodById,
  updateShippingMethodById,
  deleteShippingMethodById,
} from "../controllers/shippingController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createShippingMethod);
router.get("/:id", getShippingMethodById);
router.put("/:id", updateShippingMethodById);
router.delete("/:id", deleteShippingMethodById);
router.get("/", getShippingMethods);

export default router;
