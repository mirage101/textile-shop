import express from "express";

import {
    
  } from "../controllers/wishListController.js";
  const router = express.Router();
// Get all wishlist items
router.get('/items', async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.send(wishlistItems);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a new wishlist item
router.post('/wishlist', async (req, res) => {
  const wishlistItem = new WishlistItem(req.body);
  try {
    await wishlistItem.save();
    res.send(wishlistItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Remove a wishlist item
router.delete('/wishlist/:id', async (req, res) => {
  try {
    const removedItem = await WishlistItem.findByIdAndDelete(req.params.id);
    if (!removedItem) throw new Error('Item not found');
    res.send(removedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;