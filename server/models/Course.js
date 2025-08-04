import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: [
        'Computer Science',
        'Business Administration',
        'Engineering',
        'Psychology',
        'Mathematics',
      ],
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    semester: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: false,
    },
    courseType: {
      type: String,
      required: true,
      enum: ['Core', 'Elective', 'Lab', 'Project', 'Seminar'],
    },
    mode: {
      type: String,
      required: true,
      enum: ['In-Person', 'Online', 'Hybrid'],
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    enrolledStudents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Student',
      default: [],
    },
    schedule: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    building: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: [String],
      trim: true,
      default: [],
    },
    objectives: {
      type: String,
    },
    syllabus: {
      type: String,
    },
    textbooks: {
      type: String,
    },
    gradingCriteria: {
      type: String,
    },
    attendanceRequirement: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Cancelled', 'Completed'],
      default: 'Active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', CourseSchema);
