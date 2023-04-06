import infopagesModel from "../models/infopagesModel.js";


export const createInfoPageController = async (req, res) => {
  try {
    const {  name, content, isActive } = req.body;
    // const { name, content, isActive } = req.fields;
    //  const existingInfoPage = await infopagesModel.findOne({ name });
    //   if (existingInfoPage) {
    //     return res.status(200).send({
    //       success: false,
    //       message: "InfoPage Already Exisits",
    //     });
    //   }
    //alidation
    // switch (true) {
    //   case !name:
    //     return res.status(500).send({ error: "Name is Required" });
    //   case !content:
    //     return res.status(500).send({ error: "Content is Required" });
    //   case !isActive:
    //     return res.status(500).send({ error: "Status is Required" });
    // }

    const infoPages = await new infopagesModel({
        name,
        content,
        isActive
      }).save();
    res.status(201).send({
      success: true,
      message: "InfoPage Created Successfully",
      infoPages
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
    const infopages = await infopagesModel
      .find({})
      .populate("name")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: infopages.length,
      message: "infopages ",
      infopages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting infopages",
      error: error.message,
    });
  }
};
// // get single product
// export const getSingleProductController = async (req, res) => {
//   try {
//     const product = await productModel
//       .findOne({ slug: req.params.slug })
//       .select("-photo")
//       .populate("category");
//     res.status(200).send({
//       success: true,
//       message: "Single Product Fetched",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Eror while getitng single product",
//       error,
//     });
//   }
// };

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
    const { name, content, isActive } =
    req.body;
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

