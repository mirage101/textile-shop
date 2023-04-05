import mongoose from "mongoose";
const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: "users",
      },
    products: [
        {
          type: mongoose.ObjectId,
          ref: "Products",
        },
    ],
      
  });
  
  export default mongoose.model("Wishlist", wishListSchema);
  