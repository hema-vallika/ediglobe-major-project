"use client"

import { useState } from "react"
import { X, BookOpen, Calendar, Clock } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

export default function AddCourseForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    instructor: "",
    credits: "",
    semester: "",
    year: "",
    maxCapacity: "",
    schedule: "",
    room: "",
    building: "",
    startDate: "",
    endDate: "",
    description: "",
    prerequisites: "",
    objectives: "",
    syllabus: "",
    textbooks: "",
    gradingCriteria: "",
    attendanceRequirement: "",
    courseType: "",
    mode: "",
  })

  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"]
  const courseTypes = ["Core", "Elective", "Lab", "Project", "Seminar"]
  const modes = ["In-Person", "Online", "Hybrid"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      courseCode: "",
      courseName: "",
      department: "",
      instructor: "",
      credits: "",
      semester: "",
      year: "",
      maxCapacity: "",
      schedule: "",
      room: "",
      building: "",
      startDate: "",
      endDate: "",
      description: "",
      prerequisites: "",
      objectives: "",
      syllabus: "",
      textbooks: "",
      gradingCriteria: "",
      attendanceRequirement: "",
      courseType: "",
      mode: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add New Course</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseCode" className="text-slate-700">
                  Course Code *
                </Label>
                <Input
                  id="courseCode"
                  name="courseCode"
                  type="text"
                  placeholder="e.g., CS101"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseName" className="text-slate-700">
                  Course Name *
                </Label>
                <Input
                  id="courseName"
                  name="courseName"
                  type="text"
                  placeholder="Enter course name"
                  value={formData.courseName}
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
                <Label htmlFor="instructor" className="text-slate-700">
                  Instructor *
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  type="text"
                  placeholder="Enter instructor name"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits" className="text-slate-700">
                  Credits *
                </Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  placeholder="Enter credit hours"
                  value={formData.credits}
                  onChange={handleInputChange}
                  className="h-10"
                  min="1"
                  max="6"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseType" className="text-slate-700">
                  Course Type *
                </Label>
                <select
                  id="courseType"
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select course type</option>
                  {courseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-slate-700">
                  Mode of Delivery *
                </Label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select mode</option>
                  {modes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxCapacity" className="text-slate-700">
                  Maximum Capacity *
                </Label>
                <Input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  placeholder="Enter max students"
                  value={formData.maxCapacity}
                  onChange={handleInputChange}
                  className="h-10"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Schedule Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester" className="text-slate-700">
                  Semester *
                </Label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select semester</option>
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="text-slate-700">
                  Academic Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="text"
                  placeholder="e.g., 2024-2025"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule" className="text-slate-700">
                  Schedule *
                </Label>
                <Input
                  id="schedule"
                  name="schedule"
                  type="text"
                  placeholder="e.g., Mon, Wed, Fri 10:00-11:00 AM"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room" className="text-slate-700">
                  Room *
                </Label>
                <Input
                  id="room"
                  name="room"
                  type="text"
                  placeholder="Enter room number"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="building" className="text-slate-700">
                  Building
                </Label>
                <Input
                  id="building"
                  name="building"
                  type="text"
                  placeholder="Enter building name"
                  value={formData.building}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-slate-700">
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-slate-700">
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Course Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700">
                  Course Description *
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-24 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisites" className="text-slate-700">
                  Prerequisites
                </Label>
                <Input
                  id="prerequisites"
                  name="prerequisites"
                  type="text"
                  placeholder="Enter prerequisites (e.g., CS100, MATH101)"
                  value={formData.prerequisites}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives" className="text-slate-700">
                  Learning Objectives
                </Label>
                <textarea
                  id="objectives"
                  name="objectives"
                  placeholder="Enter learning objectives"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  className="w-full h-24 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syllabus" className="text-slate-700">
                  Syllabus Outline
                </Label>
                <textarea
                  id="syllabus"
                  name="syllabus"
                  placeholder="Enter syllabus outline"
                  value={formData.syllabus}
                  onChange={handleInputChange}
                  className="w-full h-32 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textbooks" className="text-slate-700">
                  Textbooks & References
                </Label>
                <textarea
                  id="textbooks"
                  name="textbooks"
                  placeholder="Enter textbooks and reference materials"
                  value={formData.textbooks}
                  onChange={handleInputChange}
                  className="w-full h-24 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Assessment Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Assessment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradingCriteria" className="text-slate-700">
                  Grading Criteria
                </Label>
                <textarea
                  id="gradingCriteria"
                  name="gradingCriteria"
                  placeholder="e.g., Midterm: 30%, Final: 40%, Assignments: 20%, Participation: 10%"
                  value={formData.gradingCriteria}
                  onChange={handleInputChange}
                  className="w-full h-24 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendanceRequirement" className="text-slate-700">
                  Attendance Requirement
                </Label>
                <Input
                  id="attendanceRequirement"
                  name="attendanceRequirement"
                  type="text"
                  placeholder="e.g., 75% minimum attendance required"
                  value={formData.attendanceRequirement}
                  onChange={handleInputChange}
                  className="h-10"
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
              Add Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
