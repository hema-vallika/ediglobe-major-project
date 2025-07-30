import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
     id: { type: String, required: true, unique: true }, // Course code like "CS101"
  name: { type: String, required: true },
  department: { type: String, required: true },

  // REPLACED: instructor as ObjectId referencing Teacher
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },

  credits: { type: Number, required: true },
  semester: { type: String, required: true },
  schedule: { type: String, required: true },
  room: { type: String, required: true },
  enrolledStudents: { type: Number, default: 0 },
  maxCapacity: { type: Number, required: true },
  description: { type: String },
  prerequisites: { type: String },
  status: { type: String, enum: ["Active", "Upcoming", "Completed"], default: "Active" },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
