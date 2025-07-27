"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Users,
  Clock,
  Calendar,
  Award,
  MapPin,
  User,
} from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import Navbar from "./Navbar"
import Footer from "./Footer"
import AddCourseForm from "./form/Add-course-form"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  // Sample course data
  const courses = [
    {
      id: "CS101",
      name: "Introduction to Computer Science",
      department: "Computer Science",
      instructor: "Dr. Robert Wilson",
      credits: 3,
      semester: "Fall 2024",
      schedule: "Mon, Wed, Fri 10:00-11:00 AM",
      room: "Room 201, CS Building",
      enrolledStudents: 45,
      maxCapacity: 50,
      description:
        "Fundamental concepts of computer science including programming basics, algorithms, and data structures.",
      prerequisites: "None",
      status: "Active",
      startDate: "2024-08-26",
      endDate: "2024-12-15",
    },
    {
      id: "BUS201",
      name: "Marketing Management",
      department: "Business Administration",
      instructor: "Dr. Maria Garcia",
      credits: 4,
      semester: "Fall 2024",
      schedule: "Tue, Thu 2:00-4:00 PM",
      room: "Room 105, Business Building",
      enrolledStudents: 38,
      maxCapacity: 40,
      description: "Comprehensive study of marketing principles, consumer behavior, and strategic marketing planning.",
      prerequisites: "BUS101 - Introduction to Business",
      status: "Active",
      startDate: "2024-08-26",
      endDate: "2024-12-15",
    },
    {
      id: "ENG301",
      name: "Thermodynamics",
      department: "Engineering",
      instructor: "Prof. James Anderson",
      credits: 4,
      semester: "Fall 2024",
      schedule: "Mon, Wed, Fri 1:00-2:30 PM",
      room: "Room 301, Engineering Building",
      enrolledStudents: 32,
      maxCapacity: 35,
      description: "Study of energy, heat, work, and their relationships in engineering systems.",
      prerequisites: "MATH201 - Calculus II, PHY201 - Physics II",
      status: "Active",
      startDate: "2024-08-26",
      endDate: "2024-12-15",
    },
    {
      id: "PSY101",
      name: "Introduction to Psychology",
      department: "Psychology",
      instructor: "Dr. Sarah Thompson",
      credits: 3,
      semester: "Spring 2025",
      schedule: "Tue, Thu 11:00-12:30 PM",
      room: "Room 150, Psychology Building",
      enrolledStudents: 0,
      maxCapacity: 60,
      description: "Overview of psychological principles, theories, and research methods.",
      prerequisites: "None",
      status: "Upcoming",
      startDate: "2025-01-20",
      endDate: "2025-05-15",
    },
  ]

  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment
    const matchesSemester = selectedSemester === "all" || course.semester === selectedSemester

    return matchesSearch && matchesDepartment && matchesSemester
  })

  const handleAddCourse = (courseData) => {
    console.log("New course data:", courseData)
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Course Management</h1>
              <p className="text-slate-300 text-lg">Manage courses, schedules, and academic curriculum</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses by name, code, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="h-10 px-3 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="h-10 px-3 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              <Button variant="outline" className="h-10 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Total Courses</p>
                  <p className="text-2xl font-bold text-slate-800">156</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Active Courses</p>
                  <p className="text-2xl font-bold text-slate-800">142</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">This Semester</p>
                  <p className="text-2xl font-bold text-slate-800">89</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Avg Enrollment</p>
                  <p className="text-2xl font-bold text-slate-800">38</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Courses ({filteredCourses.length} found)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">{course.name}</h3>
                      <p className="text-sm text-slate-500">
                        {course.id} • {course.credits} Credits
                      </p>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : course.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <User className="h-4 w-4 mr-2 text-slate-400" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      {course.semester}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="h-4 w-4 mr-2 text-slate-400" />
                      {course.schedule}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                      {course.room}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                      <span>Enrollment</span>
                      <span>
                        {course.enrolledStudents}/{course.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
        {/* Add Course Form */}
        <AddCourseForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} onSubmit={handleAddCourse} />
      <Footer />
    </div>
  )
}
