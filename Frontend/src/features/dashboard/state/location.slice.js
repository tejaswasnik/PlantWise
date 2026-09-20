import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeLocationAPI } from "../service/location.api.js";

// Async thunk for analyzing location
export const analyzeLocation = createAsyncThunk(
  "location/analyzeLocation",
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await analyzeLocationAPI({ latitude, longitude });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to analyze this location. Please try again.");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedLocation: null,
    analysis: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
      // Clear previous analysis when new location is selected
      state.analysis = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(analyzeLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(analyzeLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })
      // Rejected state
      .addCase(analyzeLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedLocation, clearError } = locationSlice.actions;
export default locationSlice.reducer;
