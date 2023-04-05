import wishListModel from "../models/wishListModel.js";

export const createWishListController = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingWishList = await wishListModel.findOne({ userId });
    if (existingWishList) {
      return res.status(200).send({
        success: false,
        message: "WishList Already Exisits",
      });
    }
    const wishlist = await new wishlistModel({
      userId,
      products
    }).save();
    res.status(201).send({
      success: true,
      message: "new wishlist created",
      wishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in Category",
    });
  }
};

// get all wishList
export const wishListControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};


//delete wishList
export const deleteWishListCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
