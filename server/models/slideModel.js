import mongoose from "mongoose";

// Define the Slide schema
const slideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bgImg: {
    data: Buffer,
    contentType: String,
  },
  content: {
    type: String,
  },
  arrows: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["on", "off"],
    default: "on",
  },
});

export default mongoose.model("Slide", slideSchema);
