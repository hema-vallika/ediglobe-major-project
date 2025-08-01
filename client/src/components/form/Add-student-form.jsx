import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { X, Upload, User, Mail, BookOpen } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { useDispatch, useSelector } from "react-redux";
import {
  createSignature,
  deleteImage,
  uploadImage,
} from "../../services/upload";
import { createStudent } from "../../redux/slice/studentSlice";
import BtnLoader from "../BtnLoader";

export default function AddStudentForm({ isOpen, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { loading } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  const departments = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Mathematics",
  ];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const categories = ["General", "OBC", "SC", "ST", "EWS"];

  const handlePhotoChange = async (e) => {
    if (uploadedImage) {
      const res = await deleteImage(uploadedImage.public_id);
      console.log("public id:", uploadedImage.public_id, res);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    const res = await uploadImage(file);
    setUploadedImage(res);
    console.log("image upload response:", res);
  };

  const onFormSubmit = (data) => {
    const formData = {
      ...data,
      photo: {
        public_id: uploadedImage?.public_id,
        url: uploadedImage?.url,
      },
    };
    // onSubmit(formData)
    dispatch(createStudent(formData))
      .unwrap()
      .then((res) => {
        console.log("Student created:", res);
        reset();
        setPhotoPreview(null);
        setUploadedImage(null);
        onClose();
      })
      .catch((err) => {
        console.error("Failed to create student:", err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add New Student</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-8">
          {/* PHOTO */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-slate-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                id="photo"
                accept="image/*"
                {...register("photo")}
                onChange={handlePhotoChange}
                className="hidden"
              />
              <label htmlFor="photo">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer bg-transparent"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="First Name"
              name="firstName"
              required
              register={register}
            />
            <InputGroup
              label="Last Name"
              name="lastName"
              required
              register={register}
            />
            <InputGroup
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              required
              register={register}
            />
            <SelectGroup
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              required
              register={register}
            />
            <SelectGroup
              label="Blood Group"
              name="bloodGroup"
              options={bloodGroups}
              register={register}
            />
            <InputGroup
              label="Nationality"
              name="nationality"
              register={register}
            />
            <InputGroup label="Religion" name="religion" register={register} />
            <SelectGroup
              label="Category"
              name="category"
              options={categories}
              register={register}
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Email"
              name="email"
              type="email"
              required
              register={register}
            />
            <InputGroup
              label="Phone Number"
              name="phone"
              type="tel"
              required
              register={register}
            />
            <InputGroup
              label="Address"
              name="address"
              required
              register={register}
              className="md:col-span-2"
            />
            <InputGroup label="City" name="city" required register={register} />
            <InputGroup
              label="State"
              name="state"
              required
              register={register}
            />
            <InputGroup label="ZIP Code" name="zipCode" register={register} />
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Student ID"
              name="studentId"
              required
              register={register}
            />
            <SelectGroup
              label="Department"
              name="department"
              options={departments}
              required
              register={register}
            />
            <SelectGroup
              label="Year"
              name="year"
              options={years}
              required
              register={register}
            />
            <SelectGroup
              label="Semester"
              name="semester"
              options={semesters}
              required
              register={register}
            />
            <InputGroup
              label="Enrollment Date"
              name="enrollmentDate"
              type="date"
              required
              register={register}
            />
            <InputGroup
              label="Previous Education"
              name="previousEducation"
              register={register}
            />
          </div>

          {/* Guardian Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Guardian Name"
              name="guardianName"
              required
              register={register}
            />
            <InputGroup
              label="Guardian Occupation"
              name="guardianOccupation"
              register={register}
            />
            <InputGroup
              label="Guardian Phone"
              name="guardianPhone"
              type="tel"
              required
              register={register}
            />
            <InputGroup
              label="Emergency Contact"
              name="emergencyContact"
              register={register}
            />
            <InputGroup
              label="Emergency Phone"
              name="emergencyPhone"
              type="tel"
              register={register}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              {loading ? <BtnLoader /> : "Add Student"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Subcomponents
function InputGroup({
  label,
  name,
  type = "text",
  required = false,
  register,
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name}>
        {label}
        {required && " *"}
      </Label>
      <Input
        placeholder={`Enter ${label}`}
        id={name}
        type={type}
        {...register(name, { required })}
      />
    </div>
  );
}

function SelectGroup({
  label,
  name,
  options = [],
  required = false,
  register,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
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
