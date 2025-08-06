import { useState } from "react";
import { Button } from "./ui/Button";
import { Eye, X } from "lucide-react";

const CourseDetailsModal = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!course) return null;

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        variant="outline"
        className="flex-1 bg-transparent cursor-pointer"
      >
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
             <X size={24} className="cursor-pointer" />
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {course.courseName} ({course?.courseCode})
              </h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <div>
                <strong>Instructor:</strong> {course.instructor}
              </div>
              <div>
                <strong>Department:</strong> {course.department}
              </div>
              <div>
                <strong>Credits:</strong> {course.credits}
              </div>
              <div>
                <strong>Semester:</strong> {course.semester}
              </div>
              <div>
                <strong>Year:</strong> {course.year}
              </div>
              <div>
                <strong>Course Type:</strong> {course.courseType}
              </div>
              <div>
                <strong>Mode:</strong> {course.mode}
              </div>
              <div>
                <strong>Max Capacity:</strong> {course.maxCapacity}
              </div>
              <div>
                <strong>Schedule:</strong> {course.schedule}
              </div>
              <div>
                <strong>Room:</strong> {course.room}, {course.building}
              </div>
              <div>
                <strong>Start Date:</strong>{" "}
                {new Date(course.startDate).toLocaleDateString()}
              </div>
              <div>
                <strong>End Date:</strong>{" "}
                {new Date(course.endDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Grading:</strong> {course.gradingCriteria}
              </div>
              <div>
                <strong>Attendance Required:</strong>{" "}
                {course.attendanceRequirement}
              </div>
              <div>
                <strong>Status:</strong> {course.status}
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div>
                <strong>Prerequisites:</strong>
                <ul className="list-disc list-inside ml-2">
                  {course.prerequisites.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Objectives:</strong> {course.objectives}
              </div>
              <div>
                <strong>Syllabus:</strong> {course.syllabus}
              </div>
              <div>
                <strong>Textbooks:</strong> {course.textbooks}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailsModal;
