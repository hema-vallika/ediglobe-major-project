"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { LoaderCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { createTeacher } from "../../redux/slice/teacherSlice"
import { X, Upload, User, Mail, BookOpen, Award } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import toast from "react-hot-toast"
import { deleteImage, uploadImage } from "../../services/upload.js" // Assuming you have a utility function for image upload
import {updateTeacher } from "../../redux/slice/teacherSlice"
import StudentDetails from "../StudentDetails.jsx"
import BtnLoader from "../BtnLoader.jsx"

export default function AddTeacherForm({ onClose, teacherDetails }) {
  const {register, handleSubmit, reset} = useForm({
    defaultValues: teacherDetails ? {
      ...teacherDetails,
              dateOfBirth: new Date(teacherDetails.dateOfBirth)
            .toISOString()
            .split("T")[0],
          joiningDate: new Date(teacherDetails.joiningDate)
            .toISOString()
            .split("T")[0],
        }:{
          joiningDate: new Date().toISOString().split("T")[0],
        }
    })

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   dateOfBirth: "",
  //   gender: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  //   emergencyContact: "",
  //   emergencyPhone: "",
  //   department: "",
  //   position: "",
  //   specialization: "",
  //   qualification: "",
  //   experience: "",
  //   joiningDate: "",
  //   employeeId: "",
  //   salary: "",
  //   bloodGroup: "",
  //   nationality: "",
  //   maritalStatus: "",
  //   previousInstitution: "",
  //   researchInterests: "",
  //   publications: "",
  //   awards: "",
  //   photo: null,
  // })
  const [photoPreview, setPhotoPreview] = useState(teacherDetails?.photo?.url || null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const {loading} = useSelector((state) => state.teacher)
  const dispatch = useDispatch();

  // console.log("Teacher details:", teacherDetails);

  
  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const positions = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Visiting Faculty"]
  const qualifications = ["Ph.D.", "M.Tech", "M.Sc", "MBA", "M.A", "Other"]
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const specializations = [
  "Computer Science", "Mathematics", "Physics", "Electronics", "Mechanical", "DBMS", "FLAT", "AI/ML", "Cybersecurity"
];
const categories = ["General", "SC", "ST", "OBC", "EWS"];


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }


  const handlePhotoChange = async (e) => {
    setUploadingImage(true);
    if (uploadedImage) {
       await deleteImage(uploadedImage.public_id);
      // console.log("public id:", uploadedImage.public_id, res);
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
    setUploadingImage(false);
    // console.log("image upload response:", res);
  };


const onFormSubmit = (data) => {
  const formData = {
    ...data,
    photo: {
      url: uploadedImage?.url || teacherDetails?.photo?.url || null,
      public_id: uploadedImage?.public_id || StudentDetails?.photo?.public_id || null,
    },
  };
  if(teacherDetails) {
    dispatch(updateTeacher({ id: teacherDetails.employeeId, formData }))
      .unwrap()
      .then(() => {
        // console.log("Teacher updated successfully",res);
        
        toast.success("Teacher updated successfully");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to update teacher");
        // console.error("Update teacher error:", error);
      });
  }else{
    dispatch(createTeacher(formData))
      .unwrap()
      .then(() => {
        // console.log("Teacher created successfully",res);
        reset();
        setPhotoPreview(null);
        setUploadedImage(null);
        
        toast.success("Teacher added successfully");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to add teacher");
        // console.error("Create teacher error:", error);
      });
  }


};

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">{StudentDetails?"Update":"Add"} Faculty</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-8">
          {/* Photo Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="h-16 w-16 text-slate-400" />
              )}
              {(uploadingImage && (
                <div className="h-full w-full absolute top-0 left-0 rounded-full flex items-center justify-center bg-gray-400/50">
                  <LoaderCircle size={32} className="animate-spin mx-auto" />
                </div>

              ))}
            </div>
            <div>
              <input type="file" id="photo" accept="image/*" {...register("photo")} onChange={handlePhotoChange} className="hidden" />
              <label htmlFor="photo">
                <Button type="button" variant="outline" className="cursor-pointer bg-transparent" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {/* Personal Information */}
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

          {/* Contact Information */}
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


          {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Employee ID"
              name="employeeId"
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
              label="Position"
              name="position"
              options={positions}
              required
              register={register}
            />
             <SelectGroup
              label="Specialization"
              name="specialization"
              options={specializations}
              required
              register={register}
            />
            <InputGroup
              label="Experience"
              name="experience"
              type="number"
              placeholder="Years of Experience"
              required
              register={register}
            />
            <SelectGroup
              label="Qualification"
              name="qualification"
              options={qualifications}
              required
              register={register}
            />
            <InputGroup
              label="Joining Date"
              name="joiningDate"
              type="date"
              required
              register={register}
            />
            <InputGroup
              label="Salary"
              name="salary"
              type="number"
              required
              register={register}
            />
            <InputGroup
              label="Previous Institution"
              name="previousInstitution"
              register={register}
            />
          </div>
          {/* Academic Information */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Research Interests"
            name="researchInterests"
            register={register}
          />
          <InputGroup
            label="Enter Publications"
            name="publications"
            register={register}
          />
          <InputGroup
            label="Enter Awards & Achievements"
            name="awards"
            register={register}
          />
         </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="bg-transparent cursor-pointer">
              Cancel
            </Button>
            <Button disabled={uploadingImage} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading?(
                <BtnLoader/>
              ) : (
                `${teacherDetails ? "Update" : "Add"} Faculty`
                
              )}
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
  const max = type === 'date' ? new Date().toISOString().split("T")[0] : undefined
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
        max={max}
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
