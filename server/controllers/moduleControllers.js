import tickerModel from "../models/tickerModel.js";

// Get ticker data
export const getTicker = async (req, res) => {
  try {
    const ticker = await Ticker.findOne(); // Find one document in the "Ticker" collection
    res.status(200).json({ success: true, data: ticker });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update ticker data
export const updateTicker = async (req, res) => {
  try {
    const { content } = req.body; // Get the new content from the request body
    const ticker = await Ticker.findOneAndUpdate(
      {},
      { $set: { content } },
      { new: true }
    ); // Update the "content" field and return the updated document
    res.status(200).json({ success: true, data: ticker });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
