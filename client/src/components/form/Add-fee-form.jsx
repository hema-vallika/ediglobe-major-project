"use client"

import { useState } from "react"
import { X, DollarSign, User, Calendar } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"

export default function AddFeeForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    department: "",
    year: "",
    semester: "",
    feeType: "",
    tuitionFee: "",
    libraryFee: "",
    labFee: "",
    examFee: "",
    sportsFee: "",
    developmentFee: "",
    otherFees: "",
    totalAmount: "",
    dueDate: "",
    lateFeePenalty: "",
    discountAmount: "",
    discountReason: "",
    paymentPlan: "",
    installments: "",
    remarks: "",
  })

  const departments = ["Computer Science", "Business Administration", "Engineering", "Psychology", "Mathematics"]
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"]
  const feeTypes = ["Semester Fee", "Annual Fee", "Admission Fee", "Examination Fee", "Late Fee", "Other"]
  const paymentPlans = ["Full Payment", "2 Installments", "3 Installments", "4 Installments"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-calculate total amount when individual fees change
    if (
      [
        "tuitionFee",
        "libraryFee",
        "labFee",
        "examFee",
        "sportsFee",
        "developmentFee",
        "otherFees",
        "discountAmount",
      ].includes(name)
    ) {
      calculateTotal(name, value)
    }
  }

  const calculateTotal = (changedField, changedValue) => {
    const fees = {
      tuitionFee:
        changedField === "tuitionFee"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.tuitionFee) || 0,
      libraryFee:
        changedField === "libraryFee"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.libraryFee) || 0,
      labFee:
        changedField === "labFee" ? Number.parseFloat(changedValue) || 0 : Number.parseFloat(formData.labFee) || 0,
      examFee:
        changedField === "examFee" ? Number.parseFloat(changedValue) || 0 : Number.parseFloat(formData.examFee) || 0,
      sportsFee:
        changedField === "sportsFee"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.sportsFee) || 0,
      developmentFee:
        changedField === "developmentFee"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.developmentFee) || 0,
      otherFees:
        changedField === "otherFees"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.otherFees) || 0,
      discountAmount:
        changedField === "discountAmount"
          ? Number.parseFloat(changedValue) || 0
          : Number.parseFloat(formData.discountAmount) || 0,
    }

    const subtotal =
      fees.tuitionFee +
      fees.libraryFee +
      fees.labFee +
      fees.examFee +
      fees.sportsFee +
      fees.developmentFee +
      fees.otherFees
    const total = subtotal - fees.discountAmount

    setFormData((prev) => ({
      ...prev,
      totalAmount: total.toString(),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      studentId: "",
      studentName: "",
      department: "",
      year: "",
      semester: "",
      feeType: "",
      tuitionFee: "",
      libraryFee: "",
      labFee: "",
      examFee: "",
      sportsFee: "",
      developmentFee: "",
      otherFees: "",
      totalAmount: "",
      dueDate: "",
      lateFeePenalty: "",
      discountAmount: "",
      discountReason: "",
      paymentPlan: "",
      installments: "",
      remarks: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Add Fee Record</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Student Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-slate-700">
                  Student ID *
                </Label>
                <Input
                  id="studentId"
                  name="studentId"
                  type="text"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-slate-700">
                  Student Name *
                </Label>
                <Input
                  id="studentName"
                  name="studentName"
                  type="text"
                  placeholder="Enter student name"
                  value={formData.studentName}
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
                <Label htmlFor="year" className="text-slate-700">
                  Year *
                </Label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
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
                <Label htmlFor="feeType" className="text-slate-700">
                  Fee Type *
                </Label>
                <select
                  id="feeType"
                  name="feeType"
                  value={formData.feeType}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                  required
                >
                  <option value="">Select fee type</option>
                  {feeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              Fee Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tuitionFee" className="text-slate-700">
                  Tuition Fee
                </Label>
                <Input
                  id="tuitionFee"
                  name="tuitionFee"
                  type="number"
                  placeholder="Enter tuition fee"
                  value={formData.tuitionFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="libraryFee" className="text-slate-700">
                  Library Fee
                </Label>
                <Input
                  id="libraryFee"
                  name="libraryFee"
                  type="number"
                  placeholder="Enter library fee"
                  value={formData.libraryFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labFee" className="text-slate-700">
                  Lab Fee
                </Label>
                <Input
                  id="labFee"
                  name="labFee"
                  type="number"
                  placeholder="Enter lab fee"
                  value={formData.labFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="examFee" className="text-slate-700">
                  Exam Fee
                </Label>
                <Input
                  id="examFee"
                  name="examFee"
                  type="number"
                  placeholder="Enter exam fee"
                  value={formData.examFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sportsFee" className="text-slate-700">
                  Sports Fee
                </Label>
                <Input
                  id="sportsFee"
                  name="sportsFee"
                  type="number"
                  placeholder="Enter sports fee"
                  value={formData.sportsFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="developmentFee" className="text-slate-700">
                  Development Fee
                </Label>
                <Input
                  id="developmentFee"
                  name="developmentFee"
                  type="number"
                  placeholder="Enter development fee"
                  value={formData.developmentFee}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherFees" className="text-slate-700">
                  Other Fees
                </Label>
                <Input
                  id="otherFees"
                  name="otherFees"
                  type="number"
                  placeholder="Enter other fees"
                  value={formData.otherFees}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountAmount" className="text-slate-700">
                  Discount Amount
                </Label>
                <Input
                  id="discountAmount"
                  name="discountAmount"
                  type="number"
                  placeholder="Enter discount amount"
                  value={formData.discountAmount}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountReason" className="text-slate-700">
                  Discount Reason
                </Label>
                <Input
                  id="discountReason"
                  name="discountReason"
                  type="text"
                  placeholder="Enter discount reason"
                  value={formData.discountReason}
                  onChange={handleInputChange}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount" className="text-slate-700">
                  Total Amount *
                </Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  placeholder="Total will be calculated"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  className="h-10 bg-slate-50"
                  min="0"
                  step="0.01"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-slate-700">
                  Due Date *
                </Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lateFeePenalty" className="text-slate-700">
                  Late Fee Penalty
                </Label>
                <Input
                  id="lateFeePenalty"
                  name="lateFeePenalty"
                  type="number"
                  placeholder="Enter late fee penalty"
                  value={formData.lateFeePenalty}
                  onChange={handleInputChange}
                  className="h-10"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentPlan" className="text-slate-700">
                  Payment Plan
                </Label>
                <select
                  id="paymentPlan"
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleInputChange}
                  className="h-10 w-full rounded-md border border-slate-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                >
                  <option value="">Select payment plan</option>
                  {paymentPlans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="installments" className="text-slate-700">
                  Number of Installments
                </Label>
                <Input
                  id="installments"
                  name="installments"
                  type="number"
                  placeholder="Enter number of installments"
                  value={formData.installments}
                  onChange={handleInputChange}
                  className="h-10"
                  min="1"
                  max="12"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remarks" className="text-slate-700">
                  Remarks
                </Label>
                <textarea
                  id="remarks"
                  name="remarks"
                  placeholder="Enter any additional remarks"
                  value={formData.remarks}
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
              Add Fee Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
