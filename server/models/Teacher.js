import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    emergencyContact: { type: String },
    emergencyPhone: { type: String },
    department: { type: String, required: true },
    position: { type: String },
    specialization: { type: String },
    qualification: { type: String },
    experience: { type: String },
    joiningDate: { type: Date },
    salary: { type: String },
    bloodGroup: { type: String },
    nationality: { type: String },
    maritalStatus: { type: String },
    previousInstitution: { type: String },
    researchInterests: { type: String },
    publications: { type: String },
    awards: { type: String },

    coursesTeaching: [{ type: String }], // array of course names
    studentsCount: { type: Number, default: 0 },
    status: { type: String, default: "Active" },

    photo: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
