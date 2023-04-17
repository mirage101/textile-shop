import infopagesModel from "../models/infopagesModel.js";
import slugify from "slugify";

export const createInfoPageController = async (req, res) => {
  try {
    const { name, content, isActive } = req.body;

    const infoPages = await new infopagesModel({
      name,
      content,
      isActive,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "InfoPage Created Successfully",
      infoPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating info page",
    });
  }
};

//get all infopages
export const getInfoPagesController = async (req, res) => {
  try {
    const infopages = await infopagesModel.find({});
    res.status(200).send({
      success: true,
      counTotal: infopages.length,
      message: "infopages ",
      infopages,
    });
    console.log(infopages);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting infopages",
      error: error.message,
    });
  }
};

//delete info page
export const deleteInfoPageController = async (req, res) => {
  try {
    const { id } = req.params;
    await infopagesModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Info page Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Info page",
      error,
    });
  }
};

//upate producta
export const updateInfoPageController = async (req, res) => {
  try {
    const { name, content, isActive } = req.body;
    const { id } = req.params;
    const infopage = await infopagesModel.findByIdAndUpdate(
      id,
      { name, content, isActive },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Infopage Updated Successfully",
      infopage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update infopage",
    });
  }
};

export const getInfoPageController = async (req, res) => {
  try {
    const infoPage = await infopagesModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle infoPage SUccessfully",
      infoPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single infoPage",
    });
  }
};
