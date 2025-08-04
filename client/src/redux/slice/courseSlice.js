import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
//   withCredentials: true, 
});


export const getCourses = createAsyncThunk('courses/getAll', async (_, thunkAPI) => {
  try {
    const res = await api.get("/course")
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const getCourseById = createAsyncThunk('courses/getById', async (id, thunkAPI) => {
  try {
    const res = await api.get(`/course/${id}`)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const createCourse = createAsyncThunk('courses/create', async (courseData, thunkAPI) => {
  try {
    const res = await api.post("/course", courseData)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const updateCourse = createAsyncThunk('courses/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/course/${id}`, data)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const deleteCourse = createAsyncThunk('courses/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/course/${id}`)
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
  }
})


const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(getCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false
        console.log("Fetch course res: ", action.payload);
        state.courses = action.payload
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch One
      .addCase(getCourseById.pending, (state) => {
        state.loading = true
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false
        console.log("Fetch course res: ", action.payload);
        state.currentCourse = action.payload
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create
      .addCase(createCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false
        console.log("create course res: ", action.payload);
        toast.success("Course created successfully.")
        state.courses.push(action.payload)
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update
      .addCase(updateCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        )
        toast.success("Course Updated Successfully.")
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false
        state.courses = state.courses.filter((course) => course._id !== action.payload)
        toast.success("Course Deleted Successfully.")
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCurrentCourse } = courseSlice.actions
export default courseSlice.reducer
