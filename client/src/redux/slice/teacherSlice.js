import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Base API URL
const API_URL = `${import.meta.env.VITE_SERVER_ORIGIN}/api/teachers`;

// --- Async Thunks ---

// Create a new teacher
export const createTeacher = createAsyncThunk(
  "teachers/create",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, teacherData);
    //   console.log("Teacher created:", response.data);
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all teachers
export const getAllTeachers = createAsyncThunk(
  "teachers/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get teacher by ID
export const getTeacherById = createAsyncThunk(
  "teachers/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update a teacher
export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete a teacher
export const deleteTeacher = createAsyncThunk(
  "teachers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Initial State ---
const initialState = {
  teachers: [],
  teacher: null,
  loading: false,
  error: null,
  success: false,
};

// --- Slice ---
const teacherSlice = createSlice({
  name: "teachers",
   initialState,
  reducers: {
    resetTeacherState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.teacher = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers.push(action.payload);
        toast.success("Teacher added successfully");
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to add teacher");
      })

      // READ ALL
      .addCase(getAllTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // READ BY ID
      .addCase(getTeacherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers = state.teachers.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
        toast.success("Teacher updated successfully");
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to update teacher");
      })

      // DELETE
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers = state.teachers.filter((t) => t._id !== action.payload);
        toast.success("Teacher deleted successfully");
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to delete teacher");
      });
  },
});

// --- Export ---
export const { resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
