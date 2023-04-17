import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model("PaymentMethod", paymentMethodSchema);
