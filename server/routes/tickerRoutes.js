import express from "express";
const router = express.Router();

import { getTicker, updateTicker } from "../controllers/moduleControllers.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//get slides
router.get("/get-ticker", getTicker);
//routes
router.put("/ticker/:id", requireSignIn, isAdmin, updateTicker);

export default router;
