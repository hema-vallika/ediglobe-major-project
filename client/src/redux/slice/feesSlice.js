// src/redux/slice/feesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true,
});

// GET all fees
export const getFees = createAsyncThunk(
  "fees/getFees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/fee");
      return response.data;
    } catch (err) {
      toast.error("Failed to fetch fees");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST (create) new fee
export const createFee = createAsyncThunk(
  "fees/createFee",
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/fee", feeData);
      return response.data;
    } catch (err) {
      toast.error("Failed to create fee");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const updateFee = createAsyncThunk(
  "fees/updateFee",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/fee/${id}`, data);
      return response.data;
    } catch (err) {
      toast.error("Failed to update fee");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE a fee
export const deleteFee = createAsyncThunk(
  "fees/deleteFee",
  async (feeId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/fee/${feeId}`);
      toast.success("Fee deleted successfully");
      return feeId;
    } catch (err) {
      toast.error("Failed to delete fee");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const feesSlice = createSlice({
  name: "fee",
  initialState: {
    fees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(getFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
      })
      .addCase(getFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFee.fulfilled, (state, action) => {
        state.loading = false;
        state.fees.push(action.payload);
         toast.success("Fee created successfully");
      })
      .addCase(createFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFee.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = state.fees.map((f) =>
          f._id === action.payload._id ? action.payload : f
        );
         toast.success("Fee updated successfully");
      })
      .addCase(updateFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = state.fees.filter((fee) => fee._id !== action.payload);
      })
      .addCase(deleteFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feesSlice.reducer;
