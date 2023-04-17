import express from "express";
const router = express.Router();

import {
  getTicker,
  updateTicker,
  createTicker,
} from "../controllers/moduleControllers.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//get slides
router.get("/get-ticker", getTicker);
//routes
router.put("/ticker/:id", requireSignIn, isAdmin, updateTicker);
router.post("/", createTicker);

export default router;
