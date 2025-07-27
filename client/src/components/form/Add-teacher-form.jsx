"use client"

import { useState } from "react"
import { X, Upload, User, Mail, BookOpen, Award } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

export default function AddTeacherForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    department: "",
    position: "",
    specialization: "",
    qualification: "",
    experience: "",
    joiningDate: "",
    employeeId: "",
    salary: "",
    bloodGroup: "",
    nationality: "",
    maritalStatus: "",
    previousInstitution: "",
    researchInterests: "",
    publications: "",
    awards: "",
    photo: null,
  })

  const [photoPreview, setPhotoPreview] = useState(null)

  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const positions = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Visiting Faculty"]
  const qualifications = ["Ph.D.", "M.Tech", "M.Sc", "MBA", "M.A", "Other"]
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContact: "",
      emergencyPhone: "",
      department: "",
      position: "",
      specialization: "",
      qualification: "",
      experience: "",
      joiningDate: "",
      employeeId: "",
      salary: "",
      bloodGroup: "",
      nationality: "",
      maritalStatus: "",
      previousInstitution: "",
      researchInterests: "",
      publications: "",
      awards: "",
      photo: null,
    })
    setPhotoPreview(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add New Faculty</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Photo Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="h-16 w-16 text-slate-400" />
              )}
            </div>
            <div>
              <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="hidden" />
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
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-700">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-700">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-slate-700">
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-slate-700">
                  Gender *
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="text-slate-700">
                  Blood Group
                </Label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-slate-700">
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  name="nationality"
                  type="text"
                  placeholder="Enter nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus" className="text-slate-700">
                  Marital Status
                </Label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                >
                  <option value="">Select status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-slate-700">
                  Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-slate-700">
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-slate-700">
                  State *
                </Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-slate-700">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-slate-700">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="text"
                  placeholder="Enter emergency contact name"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-slate-700">
                  Emergency Phone
                </Label>
                <Input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  placeholder="Enter emergency phone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-slate-700">
                  Employee ID *
                </Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  placeholder="Enter employee ID"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-slate-700">
                  Department *
                </Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="text-slate-700">
                  Position *
                </Label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-slate-700">
                  Specialization *
                </Label>
                <Input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="Enter specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification" className="text-slate-700">
                  Highest Qualification *
                </Label>
                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select qualification</option>
                  {qualifications.map((qual) => (
                    <option key={qual} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-slate-700">
                  Experience (Years) *
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="Enter years of experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate" className="text-slate-700">
                  Joining Date *
                </Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary" className="text-slate-700">
                  Salary
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousInstitution" className="text-slate-700">
                  Previous Institution
                </Label>
                <Input
                  id="previousInstitution"
                  name="previousInstitution"
                  type="text"
                  placeholder="Enter previous institution"
                  value={formData.previousInstitution}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Academic Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="researchInterests" className="text-slate-700">
                  Research Interests
                </Label>
                <textarea
                  id="researchInterests"
                  name="researchInterests"
                  placeholder="Enter research interests"
                  value={formData.researchInterests}
                  onChange={handleInputChange}
                  className="w-full h-20 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publications" className="text-slate-700">
                  Publications
                </Label>
                <textarea
                  id="publications"
                  name="publications"
                  placeholder="Enter publications"
                  value={formData.publications}
                  onChange={handleInputChange}
                  className="w-full h-20 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="awards" className="text-slate-700">
                  Awards & Achievements
                </Label>
                <textarea
                  id="awards"
                  name="awards"
                  placeholder="Enter awards and achievements"
                  value={formData.awards}
                  onChange={handleInputChange}
                  className="w-full h-20 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Faculty
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
