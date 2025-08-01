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
  Mail,
  Phone,
  BookOpen,
  Users,
  Award,
  Clock,
} from "lucide-react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import Navbar from "./Navbar"
import Footer from "./Footer"
import AddTeacherForm from "./form/Add-teacher-form"

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  // Sample teacher data
  const teachers = [
    {
      id: "TCH001",
      name: "Dr. Robert Wilson",
      email: "robert.wilson@college.edu",
      phone: "+1 (555) 111-2222",
      department: "Computer Science",
      position: "Professor",
      specialization: "Artificial Intelligence",
      experience: "15 years",
      qualification: "Ph.D. in Computer Science",
      joiningDate: "2009-08-15",
      coursesTeaching: ["AI Fundamentals", "Machine Learning", "Data Structures"],
      studentsCount: 120,
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "TCH002",
      name: "Dr. Maria Garcia",
      email: "maria.garcia@college.edu",
      phone: "+1 (555) 222-3333",
      department: "Business Administration",
      position: "Associate Professor",
      specialization: "Marketing Management",
      experience: "12 years",
      qualification: "Ph.D. in Business Administration",
      joiningDate: "2012-01-20",
      coursesTeaching: ["Marketing Strategy", "Consumer Behavior", "Digital Marketing"],
      studentsCount: 95,
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "TCH003",
      name: "Prof. James Anderson",
      email: "james.anderson@college.edu",
      phone: "+1 (555) 333-4444",
      department: "Engineering",
      position: "Assistant Professor",
      specialization: "Mechanical Engineering",
      experience: "8 years",
      qualification: "M.Tech in Mechanical Engineering",
      joiningDate: "2016-07-10",
      coursesTeaching: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
      studentsCount: 85,
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "TCH004",
      name: "Dr. Sarah Thompson",
      email: "sarah.thompson@college.edu",
      phone: "+1 (555) 444-5555",
      department: "Psychology",
      position: "Professor",
      specialization: "Clinical Psychology",
      experience: "18 years",
      qualification: "Ph.D. in Psychology",
      joiningDate: "2006-09-01",
      coursesTeaching: ["Abnormal Psychology", "Cognitive Psychology", "Research Methods"],
      studentsCount: 110,
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const statuses = ["Active", "On Leave", "Retired"]

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || teacher.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddTeacher = (teacherData) => {
    console.log("New teacher data:", teacherData)
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Faculty Management</h1>
              <p className="text-slate-300 text-lg">Manage faculty records, assignments, and academic information</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Faculty
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
                placeholder="Search faculty by name, ID, email, or specialization..."
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 px-3 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
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
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Total Faculty</p>
                  <p className="text-2xl font-bold text-slate-800">89</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Professors</p>
                  <p className="text-2xl font-bold text-slate-800">34</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Active Courses</p>
                  <p className="text-2xl font-bold text-slate-800">156</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Avg Experience</p>
                  <p className="text-2xl font-bold text-slate-800">12 yrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Table */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Faculty List ({filteredTeachers.length} found)</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Academic Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Teaching Load
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={teacher.avatar || "/placeholder.svg"}
                            alt={teacher.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{teacher.name}</div>
                            <div className="text-sm text-slate-500">{teacher.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900 flex items-center mb-1">
                          <Mail className="h-3 w-3 mr-1 text-slate-400" />
                          {teacher.email}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-slate-400" />
                          {teacher.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{teacher.department}</div>
                        <div className="text-sm text-slate-500">{teacher.position}</div>
                        <div className="text-sm text-slate-500">{teacher.specialization}</div>
                        <div className="text-sm text-slate-500">Exp: {teacher.experience}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{teacher.coursesTeaching.length} Courses</div>
                        <div className="text-sm text-slate-500">{teacher.studentsCount} Students</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {teacher.coursesTeaching.slice(0, 2).join(", ")}
                          {teacher.coursesTeaching.length > 2 && "..."}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            teacher.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : teacher.status === "On Leave"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No faculty found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
        {/* Add Teacher Form */}
        <AddTeacherForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} onSubmit={handleAddTeacher} />

      <Footer />
    </div>
  )
}
