import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import studentSlice from './slice/studentSlice';
import courseSlice from './slice/courseSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentSlice,
    course: courseSlice
  },
});