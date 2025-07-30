import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  gpa: {
    type: String,
  },
  status: {
    type: String,
    default: "Active",
  },
  avatar: {
    type: String,
    default: "/placeholder.svg",
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
