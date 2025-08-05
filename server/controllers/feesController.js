import Fees from "../models/Fees.js";
import Student from "../models/Student.js";
export const createFee = async (req, res) => {
  try {
    const {
      student,
      semester,
      year,
      department,
      tuitionFee,
      libraryFee,
      labFee,
      examFee,
      paidAmount,
      dueDate,
      paymentDate,
      paymentMethod,
      transactionId,
    } = req.body;

    const totalAmount =
      Number(tuitionFee) +
      Number(libraryFee) +
      Number(labFee) +
      Number(examFee);
    const pendingAmount = totalAmount - Number(paidAmount);
    let status = "Pending";

    if (pendingAmount === 0) {
      status = "Paid";
    } else if (pendingAmount === totalAmount) {
      status = "Pending";
    } else if (pendingAmount > 0 && pendingAmount < totalAmount) {
      status = "Partial";
    } else if (pendingAmount < 0) {
      status = "Overpaid"; // Optional: handle overpayments clearly
    }

    const fee = new Fees({
      student,
      semester,
      year,
      department,
      tuitionFee,
      libraryFee,
      labFee,
      examFee,
      totalAmount,
      paidAmount,
      pendingAmount,
      dueDate,
      paymentDate,
      paymentMethod,
      status,
      transactionId,
    });

    const savedFee = await fee.save();
    res.status(201).json(savedFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all fee records
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fees.find().populate("student");
    res.status(200).json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get fee by ID
export const getFeeById = async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id).populate("student");
    if (!fee) return res.status(404).json({ message: "Fee record not found" });
    res.status(200).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fee
export const updateFee = async (req, res) => {
  try {
    const feesDetails = req.body;

    const totalAmount =
      Number(feesDetails.tuitionFee) +
      Number(feesDetails.libraryFee) +
      Number(feesDetails.labFee) +
      Number(feesDetails.examFee);

    const paidAmount = Number(feesDetails.paidAmount);
    const pendingAmount = totalAmount - paidAmount;

    let status = "Pending";

    if (pendingAmount === 0) {
      status = "Paid";
    } else if (pendingAmount === totalAmount) {
      status = "Pending";
    } else if (pendingAmount > 0 && pendingAmount < totalAmount) {
      status = "Partial";
    } else if (pendingAmount < 0) {
      status = "Overpaid"; // Optional: handle overpayments clearly
    }

    feesDetails.status = status;
    feesDetails.pendingAmount = pendingAmount;
    feesDetails.totalAmount = totalAmount;

    console.log("body", feesDetails);

    const updated = await Fees.findByIdAndUpdate(req.params.id, feesDetails, {
      new: true,
    }).populate("student");

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete fee
export const deleteFee = async (req, res) => {
  try {
    await Fees.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Fee record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
