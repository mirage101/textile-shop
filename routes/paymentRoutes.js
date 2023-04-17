import express from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethodById,
  deletePaymentMethodById,
} from "../controllers/paymentController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createPaymentMethod);
router.get("/:id", getPaymentMethodById);
router.put("/:id", updatePaymentMethodById);
router.delete("/:id", deletePaymentMethodById);
router.get("/", getPaymentMethods);

export default router;
