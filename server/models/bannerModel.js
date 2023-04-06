import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  background: {
    data: Buffer,
    contentType: String,
  },
  isActive:{
    type: String,
  },
  order: {
    type: Number,
  },
  position: {
    type: String,
    default: "Top",
    enum: ["Top", "Bottom", "Left", "Right"],
  }
});

export default mongoose.model("Banner", bannerSchema);