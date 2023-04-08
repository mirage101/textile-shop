import mongoose from "mongoose";

const shippingMethodSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    rate: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ShippingMethod", shippingMethodSchema);
