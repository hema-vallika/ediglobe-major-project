import { useForm } from "react-hook-form";
import { X, BookOpen, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../redux/slice/courseSlice";

export default function AddCourseForm({ onClose, initialData = null }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData
      ? {
          ...initialData,
          startDate: new Date(initialData.startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(initialData.endDate).toISOString().split("T")[0],
          prerequisites: initialData.prerequisites.join(', ')
        }
      : {},
  });

  const dispatch = useDispatch();
  const isEditMode = Boolean(initialData);
  // console.log(initialData);


  const departments = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Mathematics",
  ];
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"];
  const courseTypes = ["Core", "Elective", "Lab", "Project", "Seminar"];
  const modes = ["In-Person", "Online", "Hybrid"];

  const handleFormSubmit = (data) => {
    // console.log("formData: ", data);
    data.prerequisites = data.prerequisites.split(",").map((i) => i.trim());

    if (isEditMode) {
      dispatch(updateCourse({id:initialData?._id, data}))
        .unwrap()
        .then(() => {
          // console.log("Course Updated:", res);
          reset();
          onClose()
        })
      
    } else {
      dispatch(createCourse(data))
        .unwrap()
        .then(() => {
          // console.log("Course Updated:", res);
          reset();
          onClose()
        })
       
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditMode ? "Update Course" : "Add New Course"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-8"
        >
          {/* --- Basic Info --- */}
          <Section
            title="Basic Information"
            icon={<BookOpen className="h-5 w-5 mr-2 text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Course Code"
                name="courseCode"
                register={register}
                required
              />
              <TextInput
                label="Course Name"
                name="courseName"
                register={register}
                required
              />
              <SelectInput
                label="Department"
                name="department"
                register={register}
                options={departments}
                required
              />
              <TextInput
                label="Instructor"
                name="instructor"
                register={register}
                required
              />
              <TextInput
                label="Credits"
                name="credits"
                register={register}
                type="number"
                required
              />
              <SelectInput
                label="Course Type"
                name="courseType"
                register={register}
                options={courseTypes}
                required
              />
              <SelectInput
                label="Mode of Delivery"
                name="mode"
                register={register}
                options={modes}
                required
              />
              <TextInput
                label="Maximum Capacity"
                name="maxCapacity"
                register={register}
                type="number"
                required
              />
            </div>
          </Section>

          {/* --- Schedule Info --- */}
          <Section
            title="Schedule Information"
            icon={<Calendar className="h-5 w-5 mr-2 text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                label="Semester"
                name="semester"
                register={register}
                options={semesters}
                required
              />
              <TextInput
                label="Academic Year"
                name="year"
                register={register}
              />
              <TextInput
                label="Schedule"
                name="schedule"
                register={register}
                required
              />
              <TextInput
                label="Room"
                name="room"
                register={register}
                required
              />
              <TextInput label="Building" name="building" register={register} />
              <TextInput
                label="Start Date"
                name="startDate"
                register={register}
                type="date"
                required
              />
              <TextInput
                label="End Date"
                name="endDate"
                register={register}
                type="date"
                required
              />
            </div>
          </Section>

          {/* --- Course Details --- */}
          <Section
            title="Course Details"
            icon={<BookOpen className="h-5 w-5 mr-2 text-blue-600" />}
          >
            <TextAreaInput
              label="Course Description"
              name="description"
              register={register}
              required
            />
            <TextInput
              label="Prerequisites"
              name="prerequisites"
              register={register}
            />
            <TextAreaInput
              label="Learning Objectives"
              name="objectives"
              register={register}
            />
            <TextAreaInput
              label="Syllabus Outline"
              name="syllabus"
              register={register}
            />
            <TextAreaInput
              label="Textbooks & References"
              name="textbooks"
              register={register}
            />
          </Section>

          {/* --- Assessment Info --- */}
          <Section
            title="Assessment Information"
            icon={<Clock className="h-5 w-5 mr-2 text-blue-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaInput
                label="Grading Criteria"
                name="gradingCriteria"
                register={register}
              />
              <TextInput
                label="Attendance Requirement"
                name="attendanceRequirement"
                register={register}
              />
            </div>
          </Section>

          {/* --- Actions --- */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditMode ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ✅ Reusable Helper Components
// ─────────────────────────────────────────────

function Section({ title, icon, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function TextInput({ label, name, type = "text", register, required = false }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-slate-700">
        {label}
        {required && " *"}
      </Label>
      <Input
        id={name}
        type={type}
        {...register(name, { required })}
        className="h-10"
      />
    </div>
  );
}

function SelectInput({ label, name, register, options, required = false }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-slate-700">
        {label}
        {required && " *"}
      </Label>
      <select
        id={name}
        {...register(name, { required })}
        className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaInput({ label, name, register, required = false }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-slate-700">
        {label}
        {required && " *"}
      </Label>
      <textarea
        id={name}
        {...register(name, { required })}
        className="w-full h-24 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
      />
    </div>
  );
}
