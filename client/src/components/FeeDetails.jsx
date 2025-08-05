import React, { useState } from "react";
import { Eye, X } from "lucide-react";
import { Button } from "./ui/Button";

const FeeDetails = ({ fee }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 bg-transparent cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      {open && (
        <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-40">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto border border-gray-200">
            <div className="flex items-center justify-between mb-4 relative">
              <h2 className="text-xl font-semibold text-gray-800">
                Fee Details - {fee.semester}
              </h2>
              <button
                className=" text-gray-500 hover:text-black text-xl cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Student ID:</span>{" "}
                {fee.student.studentId}
              </div>
              <div>
                <span className="font-medium">Department:</span>{" "}
                {fee.department}
              </div>
              <div>
                <span className="font-medium">Year:</span> {fee.year}
              </div>
              <div>
                <span className="font-medium">Semester:</span> {fee.semester}
              </div>
              <div>
                <span className="font-medium">Tuition Fee:</span> ₹
                {fee.tuitionFee}
              </div>
              <div>
                <span className="font-medium">Library Fee:</span> ₹
                {fee.libraryFee}
              </div>
              <div>
                <span className="font-medium">Lab Fee:</span> ₹{fee.labFee}
              </div>
              <div>
                <span className="font-medium">Exam Fee:</span> ₹{fee.examFee}
              </div>
              <div>
                <span className="font-medium">Total Amount:</span> ₹
                {fee.totalAmount}
              </div>
              <div>
                <span className="font-medium">Paid Amount:</span> ₹
                {fee.paidAmount}
              </div>
              <div>
                <span className="font-medium">Pending Amount:</span> ₹
                {fee.pendingAmount}
              </div>
              <div>
                <span className="font-medium">Due Date:</span> {fee.dueDate}
              </div>
              <div>
                <span className="font-medium">Payment Date:</span>{" "}
                {fee.paymentDate}
              </div>
              <div>
                <span className="font-medium">Payment Method:</span>{" "}
                {fee.paymentMethod}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white text-xs ${
                    fee.status === "Paid" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {fee.status}
                </span>
              </div>
              <div>
                <span className="font-medium">Transaction ID:</span>{" "}
                {fee.transactionId || "N/A"}
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Created at: {new Date(fee.createdAt).toLocaleString()}
              <br />
              Last updated: {new Date(fee.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeDetails;
