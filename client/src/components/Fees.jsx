"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  Receipt,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddFeeForm from "./form/FeeForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteFee, getFees } from "../redux/slice/feesSlice";
import FeeForm from "./form/FeeForm";
import FeeDetails from "./FeeDetails";

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  // const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const { fees } = useSelector((state) => state.fee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFees());
  }, []);

  // Sample fees data
  // const feesRecords = [
  //   {
  //     id: "FEE001",
  //     studentId: "STU001",
  //     studentName: "John Smith",
  //     department: "Computer Science",
  //     year: "3rd Year",
  //     semester: "Fall 2024",
  //     tuitionFee: 5000,
  //     libraryFee: 200,
  //     labFee: 300,
  //     examFee: 150,
  //     totalAmount: 5650,
  //     paidAmount: 5650,
  //     pendingAmount: 0,
  //     dueDate: "2024-09-15",
  //     paymentDate: "2024-09-10",
  //     paymentMethod: "Credit Card",
  //     status: "Paid",
  //     transactionId: "TXN123456789",
  //   },
  //   {
  //     id: "FEE002",
  //     studentId: "STU002",
  //     studentName: "Sarah Johnson",
  //     department: "Business Administration",
  //     year: "2nd Year",
  //     semester: "Fall 2024",
  //     tuitionFee: 4500,
  //     libraryFee: 200,
  //     labFee: 150,
  //     examFee: 150,
  //     totalAmount: 5000,
  //     paidAmount: 3000,
  //     pendingAmount: 2000,
  //     dueDate: "2024-09-15",
  //     paymentDate: "2024-08-20",
  //     paymentMethod: "Bank Transfer",
  //     status: "Partial",
  //     transactionId: "TXN123456790",
  //   },
  //   {
  //     id: "FEE003",
  //     studentId: "STU003",
  //     studentName: "Michael Brown",
  //     department: "Engineering",
  //     year: "4th Year",
  //     semester: "Fall 2024",
  //     tuitionFee: 5500,
  //     libraryFee: 200,
  //     labFee: 400,
  //     examFee: 150,
  //     totalAmount: 6250,
  //     paidAmount: 0,
  //     pendingAmount: 6250,
  //     dueDate: "2024-09-15",
  //     paymentDate: null,
  //     paymentMethod: null,
  //     status: "Pending",
  //     transactionId: null,
  //   },
  //   {
  //     id: "FEE004",
  //     studentId: "STU004",
  //     studentName: "Emily Davis",
  //     department: "Psychology",
  //     year: "1st Year",
  //     semester: "Fall 2024",
  //     tuitionFee: 4000,
  //     libraryFee: 200,
  //     labFee: 100,
  //     examFee: 150,
  //     totalAmount: 4450,
  //     paidAmount: 0,
  //     pendingAmount: 4450,
  //     dueDate: "2024-09-10",
  //     paymentDate: null,
  //     paymentMethod: null,
  //     status: "Overdue",
  //     transactionId: null,
  //   },
  // ];

  const statuses = ["Paid", "Partial", "Pending", "Overdue"];
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"];

  const filteredRecords = fees
  ? fees.filter((record) => {
      const matchesSearch =
        record.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record._id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || record.status === selectedStatus;
      const matchesSemester =
        selectedSemester === "all" || record.semester === selectedSemester;

      return matchesSearch && matchesStatus && matchesSemester;
    })
  : [];

  // const handleAddFee = (feeData) => {
  //   console.log("New fee data:", feeData);
  //   // Here you would typically send the data to your backend
  //   // For now, we'll just log it
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Partial":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4" />;
      case "Partial":
        return <Clock className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Overdue":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Calculate totals
  const totalRevenue =
    fees && fees.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending =
    fees && fees.reduce((sum, record) => sum + record.pendingAmount, 0);
  const paidCount =
    fees && fees.filter((record) => record.status === "Paid").length;
  const overdueCount =
    fees && fees.filter((record) => record.status === "Overdue").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header Section */}
      {/* <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Fees Management
              </h1>
              <p className="text-slate-300 text-lg">
                Track student fees, payments, and financial records
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                // onClick={() => setIsAddFormOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Fee Record
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Filters and Search */}
      <section className="py-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by student name, ID, or fee record..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-10 px-3 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
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
                  <option
                    key={semester}
                    value={semester}
                  >
                    {semester}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                className="h-10 bg-transparent"
              >
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
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ₹{totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Pending Amount</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ₹{totalPending.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Paid Records</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {paidCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Overdue</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {overdueCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees Table */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Fee Records ({filteredRecords.length} found)
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Fee Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Payment Info
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
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <img
                          className="h-12 w-12 rounded-full object-cover object-top"
                          src={record.student?.photo?.url || "/placeholder.svg"}
                          alt={record.student?.name}
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {record.student.firstName} {record.student.lastName}
                          </div>
                          <div className="text-sm text-slate-500">
                            {record.student.studentId}
                          </div>
                          <div className="text-sm text-slate-500">
                            {record.student.department}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          {record._id}
                        </div>
                        <div className="text-sm text-slate-500">
                          {record.semester}
                        </div>
                        <div className="text-sm text-slate-500">
                          Due: {new Date(record.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          Total: ₹{record.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          Paid: ₹{record.paidAmount.toLocaleString()}
                        </div>
                        {record.pendingAmount > 0 && (
                          <div className="text-sm text-red-600">
                            Pending: ₹{record.pendingAmount.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.paymentDate && (
                          <div className="text-sm text-slate-900 flex items-center mb-1">
                            <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                            {new Date(record.paymentDate).toLocaleDateString()}
                          </div>
                        )}
                        {record.paymentMethod && (
                          <div className="text-sm text-slate-500 flex items-center">
                            <CreditCard className="h-3 w-3 mr-1 text-slate-400" />
                            {record.paymentMethod}
                          </div>
                        )}
                        {record.transactionId && (
                          <div className="text-xs text-slate-400">
                            ID: {record.transactionId}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {getStatusIcon(record.status)}
                          <span className="ml-1">{record.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <FeeDetails fee={record} />
                          <FeeForm studentFeeDetails={record} />
                          <Button
                          onClick={()=>dispatch(deleteFee(record._id))}
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

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No fee records found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* {isAddFormOpen && <AddFeeForm
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddFee}
      />} */}
      <Footer />
    </div>
  );
}
