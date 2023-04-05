import bannerModel from "../models/bannerModel.js";

import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

export const createBannerController = async (req, res) => {
    try {
      const { name, content, bgImage, isActive, order } =
        req.fields;
      const { bgImage } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });        
        case bgImage.size > 1000000:
          return res
            .status(500)
            .send({ error: "bgImage should be less then 1mb" });
      }
  
      const banners = new bannerModel({ ...req.fields });
      if (bgImage) {
        banners.bgImage.data = fs.readFileSync(bgImage.path);
        banners.bgImage.contentType = bgImage.type;
      }
      await banners.save();
      res.status(201).send({
        success: true,
        message: "bgImage Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing bgImage",
      });
    }
  };
  
  //get all banners
  export const getBannerController = async (req, res) => {
    try {
      const banners = await bannerModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
        res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "All banners ",
        banners,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting banners",
        error: error.message,
      });
    }
  };

  // get bg
export const bannerBgController = async (req, res) => {
    try {
      const banner = await bannerModel.findById(req.params.pid).select("bgImage");
      if (banner.bgImage.data) {
        res.set("Content-type", banner.bgImage.contentType);
        return res.status(200).send(banner.bgImage.data);
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
  
  //delete controller
  export const deleteBannerController = async (req, res) => {
    try {
      await bannerModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Banner Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting banner",
        error,
      });
    }
  };
