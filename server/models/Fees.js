

import mongoose from "mongoose"

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  semester: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },

  tuitionFee: { type: Number, required: true },
  libraryFee: { type: Number, default: 0 },
  labFee: { type: Number, default: 0 },
  examFee: { type: Number, default: 0 },

  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  pendingAmount: { type: Number, required: true },

  dueDate: { type: Date, required: true },
  paymentDate: { type: Date },
  paymentMethod: { type: String },
  status: {
    type: String,
    enum: ["Paid", "Partial", "Pending", "Overdue"],
    default: "Pending",
  },
  transactionId: { type: String },
}, { timestamps: true })

export default mongoose.model("Fees", feeSchema)

