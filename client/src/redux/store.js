import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import studentSlice from "./slice/studentSlice";
import courseSlice from "./slice/courseSlice";
import feesSlice from "./slice/feesSlice";
import teacherSlice from "./slice/teacherSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentSlice,
    course: courseSlice,
    fee: feesSlice,
    teacher: teacherSlice,
  },
});
