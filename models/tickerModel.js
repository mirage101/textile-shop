import mongoose from "mongoose";

const tickerSchema = new mongoose.Schema({
  content: {
    type: [String], // "content" field is an array of strings
    required: true,
  },
  isActive: {
    type: Boolean, // "isActive" field is a boolean value
    required: true,
  },
});

export default mongoose.model("Ticker", tickerSchema);
