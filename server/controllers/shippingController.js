import ShippingMethod from "../models/shippingModel.js";

// Create a new shipping method
export const createShippingMethod = async (req, res) => {
  try {
    const { method, status, rate, details } = req.body;

    switch (true) {
      case !method:
        return res.status(500).send({ error: "method is Required" });
      case !status:
        return res.status(500).send({ error: "status is Required" });
      case !rate:
        return res.status(500).send({ error: "rate is Required" });
      case !details:
        return res.status(500).send({ error: "details is Required" });
    }

    const newShippingMethod = new ShippingMethod({
      method,
      status,
      rate,
      details,
    });
    console.log(newShippingMethod);
    await newShippingMethod.save();
    res.status(201).send({
      success: true,
      message: "newShippingMethod Created Successfully",
      newShippingMethod,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing newShippingMethod",
    });
  }
};

// Get all shipping methods
export const getShippingMethods = async (req, res) => {
  try {
    const shippingMethods = await ShippingMethod.find();
    res.status(200).json(shippingMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single shipping method by id
export const getShippingMethodById = async (req, res) => {
  try {
    const shippingMethod = await ShippingMethod.findById(req.params.id);
    if (!shippingMethod) {
      return res.status(404).json({ message: "Shipping method not found" });
    }
    res.status(200).json(shippingMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a shipping method by id
export const updateShippingMethodById = async (req, res) => {
  try {
    const { method, status, rate, details } = req.body;
    const shippingMethod = await ShippingMethod.findById(req.params.id);
    if (!shippingMethod) {
      return res.status(404).json({ message: "Shipping method not found" });
    }
    shippingMethod.method = method || shippingMethod.method;
    shippingMethod.status = status || shippingMethod.status;
    shippingMethod.rate = rate || shippingMethod.rate;
    shippingMethod.details = details || shippingMethod.details;
    const updatedShippingMethod = await shippingMethod.save();
    res.status(200).json(updatedShippingMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a shipping method by id
export const deleteShippingMethodById = async (req, res) => {
  try {
    const shippingMethod = await ShippingMethod.findById(req.params.id);
    if (!shippingMethod) {
      return res.status(404).json({ message: "Shipping method not found" });
    }
    await shippingMethod.remove();
    res.status(200).json({ message: "Shipping method deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
