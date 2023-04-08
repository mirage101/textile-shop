import express from "express";
const router = express.Router();

import {
  getAllSlides,
  getSlideById,
  createSlide,
  slideBgController,
  updateSlideById,
  deleteSliderById,
} from "../controllers/slideController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

//routes
router.post("/create-slide", requireSignIn, isAdmin, formidable(), createSlide);
//routes
router.put(
  "/update-slide/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateSlideById
);

//get slides
router.get("/get-slides", getAllSlides);

//single slide
router.get("/get-slide/:id", getSlideById);

//get photo
router.get("/slide-bg/:id", slideBgController);

//delete rslide
router.delete("/delete-slide/:id", deleteSliderById);

export default router;
