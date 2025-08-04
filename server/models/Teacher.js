import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String },
    specialization: { type: String },
    experience: { type: String },
    qualification: { type: String },
    joiningDate: { type: Date },
    coursesTeaching: { type: [String] },
    studentsCount: { type: Number },
    status: { type: String },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
