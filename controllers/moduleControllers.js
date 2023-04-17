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

export const createTicker = async (req, res) => {
  const { content, isActive } = req.body;

  try {
    const ticker = await Ticker.create({ content, isActive });
    res.status(201).json(ticker);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
