import { useEffect, useState } from "react";
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
  Calendar,
  BookOpen,
  GraduationCap,
  User,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddStudentForm from "./form/Add-student-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudents } from "../redux/slice/studentSlice";
import StudentDetails from "./StudentDetails";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const { students } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  // Sample student data
  // const students = [
  //   {
  //     id: "STU001",
  //     name: "John Smith",
  //     email: "john.smith@college.edu",
  //     phone: "+1 (555) 123-4567",
  //     department: "Computer Science",
  //     year: "3rd Year",
  //     semester: "6th Semester",
  //     address: "123 Main St, City, State 12345",
  //     enrollmentDate: "2022-08-15",
  //     gpa: "3.8",
  //     status: "Active",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "STU002",
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@college.edu",
  //     phone: "+1 (555) 234-5678",
  //     department: "Business Administration",
  //     year: "2nd Year",
  //     semester: "4th Semester",
  //     address: "456 Oak Ave, City, State 12345",
  //     enrollmentDate: "2023-08-20",
  //     gpa: "3.9",
  //     status: "Active",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "STU003",
  //     name: "Michael Brown",
  //     email: "michael.brown@college.edu",
  //     phone: "+1 (555) 345-6789",
  //     department: "Engineering",
  //     year: "4th Year",
  //     semester: "8th Semester",
  //     address: "789 Pine St, City, State 12345",
  //     enrollmentDate: "2021-08-10",
  //     gpa: "3.7",
  //     status: "Active",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: "STU004",
  //     name: "Emily Davis",
  //     email: "emily.davis@college.edu",
  //     phone: "+1 (555) 456-7890",
  //     department: "Psychology",
  //     year: "1st Year",
  //     semester: "2nd Semester",
  //     address: "321 Elm St, City, State 12345",
  //     enrollmentDate: "2024-08-25",
  //     gpa: "4.0",
  //     status: "Active",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  // ]

  const departments = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Mathematics",
  ];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const filteredStudents = students?.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || student.department === selectedDepartment;
    const matchesYear = selectedYear === "all" || student.year === selectedYear;

    return matchesSearch && matchesDepartment && matchesYear;
  });
  const handleAddStudent = (studentData) => {
    console.log("New student data:", studentData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  };
  const [viewStudentDetails, setViewStudentDetails] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)

  const handleViewStudent = (student) => {
    setViewStudentDetails(student)
    setIsDetailsOpen(true)
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Student Management
              </h1>
              <p className="text-slate-300 text-lg">
                Manage student records, enrollment, and academic information
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsAddFormOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Student
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
                placeholder="Search students by name, ID, or email..."
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-10 px-3 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
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
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Total Students</p>
                  <p className="text-2xl font-bold text-slate-800">{students?.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Active Students</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {students?.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">New Enrollments</p>
                  <p className="text-2xl font-bold text-slate-800">156</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Graduating Soon</p>
                  <p className="text-2xl font-bold text-slate-800">89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students Table */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Students List ({filteredStudents.length} found)
              </h2>
            </div>

            {filteredStudents.length ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Academic Info
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
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-full object-cover object-top"
                              src={student.photo.url || "/placeholder.svg"}
                              alt={student.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900 capitalize">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="text-sm text-slate-500">
                                {student.studentId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900 flex items-center mb-1">
                            <Mail className="h-3 w-3 mr-1 text-slate-400" />
                            {student.email}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1 text-slate-400" />
                            {student.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {student.department}
                          </div>
                          <div className="text-sm text-slate-500">
                            {student.year} • {student.semester}
                          </div>
                          {/* <div className="text-sm text-slate-500">
                            GPA: {student.gpa}
                          </div> */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <StudentDetails student={student}/>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 bg-transparent cursor-pointer"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent cursor-pointer"
                              onClick={()=>dispatch(deleteStudent(student._id))}
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
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No students found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AddStudentForm
        isOpen={isAddFormOpen}
        
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddStudent}
      />

      <Footer />
    </div>
  );
}
