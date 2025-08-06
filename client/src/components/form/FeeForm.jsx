import { useForm, Controller } from "react-hook-form";
import { Edit, Plus, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnLoader from "../BtnLoader";
import { createFee, updateFee } from "../../redux/slice/feesSlice";

export default function FeeForm({
  studentId = null,
  studentFeeDetails = null,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: studentId
      ? { student: studentId }
      : {
          ...studentFeeDetails,
          student: studentFeeDetails.student?._id,
          dueDate: new Date(studentFeeDetails.dueDate)
            .toISOString()
            .split("T")[0],
          paymentDate: new Date(studentFeeDetails.paymentDate)
            .toISOString()
            .split("T")[0],
        },
  });


  const [isOpen, setIsOpen] = useState(false);

  const departments = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Mathematics",
  ];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025"];
  // const statuses = ["Paid", "Partial", "Pending", "Overdue"];

  const { loading } = useSelector((state) => state.fee);
  const dispatch = useDispatch();

  const onFormSubmit = (data) => {

    if (studentFeeDetails) {
      console.log("Updating .....", data);
      dispatch(updateFee({ id: studentFeeDetails._id, data }))
        .unwrap()
        .then(() => {
          reset();
          setIsOpen(false);
        })
        .catch((err) => {
          console.error("Failed to updated fees:", err);
        });
    } else {
      console.log("Adding .....", data);
      dispatch(createFee(data))
        .unwrap()
        .then(() => {
          reset();
          setIsOpen(false);
        })
        .catch((err) => {
          console.error("Failed to add fee:", err);
        });
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 bg-transparent cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {studentFeeDetails ? (
          <Edit className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">
                {studentFeeDetails ? "Update" : "Add"} Fee Record
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="student">Student ID *</Label>
                  <Input
                    id="student"
                    {...register("student", { required: true })}
                    placeholder="Student ObjectID"
                  />
                  {errors.student && (
                    <p className="text-red-600 text-sm">
                      Student ID is required
                    </p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="department">Department *</Label>
                  <select
                    id="department"
                    {...register("department", { required: true })}
                    className="w-full h-10 border rounded px-2"
                  >
                    <option value="">Select department</option>
                    {departments.map((d) => (
                      <option
                        key={d}
                        value={d}
                      >
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-600 text-sm">
                      Department is required
                    </p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="year">Year *</Label>
                  <select
                    id="year"
                    {...register("year", { required: true })}
                    className="w-full h-10 border rounded px-2"
                  >
                    <option value="">Select year</option>
                    {years.map((y) => (
                      <option
                        key={y}
                        value={y}
                      >
                        {y}
                      </option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="text-red-600 text-sm">Year is required</p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="semester">Semester *</Label>
                  <select
                    id="semester"
                    {...register("semester", { required: true })}
                    className="w-full h-10 border rounded px-2"
                  >
                    <option value="">Select semester</option>
                    {semesters.map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.semester && (
                    <p className="text-red-600 text-sm">Semester is required</p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="tuitionFee">Tuition Fee *</Label>
                  <Input
                    id="tuitionFee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    {...register("tuitionFee", { required: true })}
                  />
                  {errors.tuitionFee && (
                    <p className="text-red-600 text-sm">Required</p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="libraryFee">Library Fee</Label>
                  <Input
                    id="libraryFee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    {...register("libraryFee")}
                  />
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="labFee">Lab Fee</Label>
                  <Input
                    id="labFee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    {...register("labFee")}
                  />
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="examFee">Exam Fee</Label>
                  <Input
                    id="examFee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    {...register("examFee")}
                  />
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="paidAmount">Paid Amount</Label>
                  <Input
                    id="paidAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    {...register("paidAmount")}
                  />
                </div>

                {/* <div className="space-y-2  flex flex-col">
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    readOnly
                    {...register("totalAmount")}
                  />
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="pendingAmount">Pending Amount</Label>
                  <Input
                    id="pendingAmount"
                    type="number"
                    readOnly
                    {...register("pendingAmount")}
                  />
                </div> */}

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    {...register("dueDate", { required: true })}
                  />
                  {errors.dueDate && (
                    <p className="text-red-600 text-sm">Due date is required</p>
                  )}
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    {...register("paymentDate")}
                  />
                </div>

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Input
                    id="paymentMethod"
                    placeholder="e.g. Cash / Card / UPI"
                    {...register("paymentMethod")}
                  />
                </div>

                {/* <div className="space-y-2  flex flex-col">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    {...register("status")}
                    className="w-full h-10 border rounded px-2"
                  >
                    <option value="">Select status</option>
                    {statuses.map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className="space-y-2  flex flex-col">
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input
                    id="transactionId"
                    placeholder="Transaction ID"
                    {...register("transactionId")}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <BtnLoader />
                  ) : studentFeeDetails ? (
                    "Update Fee Details"
                  ) : (
                    "Submit Fee Record"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
