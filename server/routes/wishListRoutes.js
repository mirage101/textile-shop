import express from "express";
import Wishlist from "../models/wishlistModel.js";

  const router = express.Router();
// Get all wishlist items
router.get("/", async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getWishlist, (req, res) => {
  res.json(res.wishlist);
});

async function getWishlist(req, res, next) {
  let wishlist;
  try {
    wishlist = await Wishlist.findById(req.params.id);
    if (wishlist == null) {
      return res.status(404).json({ message: "Cannot find wishlist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.wishlist = wishlist;
  next();
}

router.post("/", async (req, res) => {
  const wishlist = new Wishlist({
    userId: req.body.userId,
    products: req.body.products,
  });
  try {
    const newWishlist = await wishlist.save();
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getWishlist, async (req, res) => {
  if (req.body.userId != null) {
    res.wishlist.userId = req.body.userId;
  }
  if (req.body.products != null) {
    res.wishlist.products = req.body.products;
  }
  try {
    const updatedWishlist = await res.wishlist.save();
    res.json(updatedWishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a wishlist item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Wishlist Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Wishlist",
      error,
    });
  }
});
export default router;