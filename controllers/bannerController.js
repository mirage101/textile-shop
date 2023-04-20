import bannerModel from "../models/bannerModel.js";

import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();
// import validator from "validator";

export const createBannerController = async (req, res) => {
  try {
    const { name, content, isActive, order, position } = req.fields;
    const { background } = req.files;
    // const isActive = validator.toBoolean(req.fields.isActive);

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case background && background.size > 1000000:
        return res.status(500).send({
          error: "background is Required and should be less then 1mb",
        });
    }

    const banner = new bannerModel({ ...req.fields, slug: slugify(name) });
    if (background) {
      banner.background.data = fs.readFileSync(background.path);
      banner.background.contentType = background.type;
    }
    await banner.save();
    res.status(201).send({
      success: true,
      message: "Banner Created Successfully",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating banner",
    });
  }
};

// get single banner
export const getSingleBannerController = async (req, res) => {
  const {id} = req.params;
  try {
    const banner = await bannerModel
      .findById(id)
      
    // .populate("category");
    res.status(200).send({
      success: true,
      message: "Banner Fetched",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single banner",
      error,
    });
  }
};
//get all banners
export const getBannerController = async (req, res) => {
  try {
    const banners = await bannerModel.find({});
    res.status(200).send({
      success: true,
      message: "All banners",
      banners,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting banners",
      error: error.message,
    });
  }
};

//upate producta
export const updateBannerController = async (req, res) => {
  try {
    const { name, content, isActive, order, position, bgImage } = req.fields;
    
    const { id } = req.params;

    console.log(id, name, content, isActive, order, position, bgImage)

    const banner = await bannerModel.findByIdAndUpdate(
      id,
      { name, content, isActive, order, bgImage, position },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Banner Updated Successfully",
      banner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Banner",
    });
  }
};
export const deleteBannerController = async (req, res) => {
  try {
    const { id } = req.params;
    await bannerModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Banner Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Banner",
      error,
    });
  }
};

// get background
export const bannerBgController = async (req, res) => {
  try {
    const banner = await bannerModel
      .findById(req.params.id)
      .select("background");
    if (banner.background.data) {
      res.set("Content-type", banner.background.contentType);
      return res.status(200).send(banner.background.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
