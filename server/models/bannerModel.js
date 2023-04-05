import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  content: {
    type: String,
  },
  bgImage: {
    data: Buffer,
    contentType: String,
  },
  isActive:{
    type: Boolean,
  },
  order: {}
});

export default mongoose.model("Banner", bannerSchema);