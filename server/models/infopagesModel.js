import mongoose from "mongoose";

const infoPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
  }
);

export default mongoose.model("InfoPage", infoPageSchema);
