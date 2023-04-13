import paymentModel from "../models/paymentModel.js";

// Create a new payment method
export const createPaymentMethod = async (req, res) => {
  try {
    const { method, status } = req.body;

    switch (true) {
      case !method:
        return res.status(500).send({ error: "method is Required" });
    }
    console.log("status ", status);
    const paymentMethod = new paymentModel({
      method,
      status,
    });
    console.log(paymentMethod);
    await paymentMethod.save();
    res.status(201).send({
      success: true,
      message: "paymentModel Created Successfully",
      paymentMethod,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing paymentMethod",
    });
  }
};

// Get all payment methods
export const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await paymentModel.find({});
    res.status(200).send({
      success: true,
      message: "paymentMethods ",
      paymentMethods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting paymentMethods",
      error: error.message,
    });
  }
};

// Get a single payment method by id
export const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await paymentModel.findById(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    res.status(200).json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a payment method by id
export const updatePaymentMethodById = async (req, res) => {
  try {
    const { method, status, rate, details } = req.body;
    const paymentMethod = await paymentModel.findById(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }
    paymentMethod.method = method || paymentMethod.method;
    paymentMethod.status = status || paymentMethod.status;
    const updatedPaymentMethod = await paymentMethod.save();
    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a payment method by id
export const deletePaymentMethodById = async (req, res) => {
  try {
    await paymentModel.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    res.status(200).send({
      success: true,
      message: "paymentMethod Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
