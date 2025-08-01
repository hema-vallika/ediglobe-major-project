import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String },
  emergencyContact: { type: String },
  emergencyPhone: { type: String },
  department: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  enrollmentDate: { type: Date, required: true },
  studentId: { type: String, required: true, unique: true },
  bloodGroup: { type: String },
  nationality: { type: String },
  religion: { type: String },
  category: { type: String },
  previousEducation: { type: String },
  guardianName: { type: String, required: true },
  guardianOccupation: { type: String },
  guardianPhone: { type: String, required: true },
  photo: {
    public_id: String,
    url: String
  },
  status: { type: String, default: "active" },
}, { timestamps: true })

const Student = mongoose.model("Student", studentSchema);
export default Student;
