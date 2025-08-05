import React, { useState } from "react";
import { Eye, X } from "lucide-react";
import { Button } from "./ui/Button";

const StudentDetails = ({ student }) => {
  const [open, setOpen] = useState(false);

  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    city,
    state,
    zipCode,
    department,
    year,
    semester,
    enrollmentDate,
    studentId,
    bloodGroup,
    nationality,
    religion,
    category,
    guardianName,
    guardianPhone,
    guardianOccupation,
    photo,
    emergencyContact,
    emergencyPhone,

  } = student;

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
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-6">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
             <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={photo?.url || "/placeholder.svg"}
                alt="Student"
                className="w-32 h-32 rounded-full object-cover shadow"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600">ID: {studentId}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-lg">
              <div className="">
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone:</strong> {phone}
                </p>
                <p>
                  <strong>DOB:</strong>{" "}
                  {new Date(dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Gender:</strong> {gender}
                </p>
                <p>
                  <strong>Blood Group:</strong> {bloodGroup}
                </p>
                <p>
                  <strong>Nationality:</strong> {nationality}
                </p>
                <p>
                  <strong>Religion:</strong> {religion}
                </p>
                <p>
                  <strong>Category:</strong> {category}
                </p>
              </div>

              <div className="">
                <p>
                  <strong>Department:</strong> {department}
                </p>
                <p>
                  <strong>Year:</strong> {year}
                </p>
                <p>
                  <strong>Semester:</strong> {semester}
                </p>
                <p>
                  <strong>Enrolled On:</strong>{" "}
                  {new Date(enrollmentDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Guardian:</strong> {guardianName}
                </p>
                <p>
                  <strong>Guardian Phone:</strong> {guardianPhone}
                </p>
                <p>
                  <strong>Guardian Occupation:</strong> {guardianOccupation}
                </p>
                <p>
                  <strong>Emergency Contact:</strong> {emergencyContact}
                </p>
                <p>
                  <strong>Emergency Phone:</strong> {emergencyPhone}
                </p>
              </div>

              <div className="md:col-span-2 mt-4">
                <p>
                  <strong>Address:</strong> {address}, {city}, {state} -{" "}
                  {zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentDetails;
