import slideModel from "../models/slideModel.js";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

// GET all sliders
export const getAllSlides = async (req, res) => {
  try {
    const slides = await slideModel
      .find({})
      .select("-bg")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All slides ",
      slides,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// GET a single slider by ID
export const getSlideById = async (req, res) => {
  try {
    const slide = await slideModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "slide ",
      slide,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting slide",
      error: error.message,
    });
  }
};

// CREATE a new slider
export const createSlide = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, content, arrows, status } = req.fields;

    const { bgImg } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case bgImg && bgImg.size > 1000000:
        return res
          .status(500)
          .send({ error: "bgImg is Required and should be less then 1mb" });
    }

    const slide = new slideModel({ ...req.fields });
    if (bgImg) {
      slide.bgImg.data = fs.readFileSync(bgImg.path);
      slide.bgImg.contentType = bgImg.type;
    }
    await slide.save();
    res.status(201).send({
      success: true,
      message: "Slider Created Successfully",
      slide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing Slider",
    });
  }
};

// get photo
export const slideBgController = async (req, res) => {
  try {
    const slide = await slideModel.findById(req.params.id).select("bgImg");
    if (slide.bgImg.data) {
      res.set("Content-type", slide.bgImg.contentType);
      return res.status(200).send(slide.bgImg.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting bgImage",
      error,
    });
  }
};

// UPDATE a slider by ID
export const updateSlideById = async (req, res) => {
  try {
    const { name, content, arrows, status } = req.fields;

    const { bgImg } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case bgImg && bgImg.size > 1000000:
        return res
          .status(500)
          .send({ error: "bgImg is Required and should be less then 1mb" });
    }

    const slide = await slideModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (bgImg) {
      slide.bgImg.data = fs.readFileSync(bgImg.path);
      slide.bgImg.contentType = bgImg.type;
    }
    await slide.save();
    res.status(201).send({
      success: true,
      message: "Slide Updated Successfully",
      slide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte Slide",
    });
  }
};

// DELETE a slider by ID
export const deleteSliderById = async (req, res) => {
  try {
    await slideModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "slide Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting slide",
      error,
    });
  }
};
