import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import classSerivce from "./classService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Helper function
// Register user
export const getClassInfo = createAsyncThunk(
  "class/getClassInfo",
  async (user, thunkAPI) => {
    try {
      return await classSerivce.getClassInfo(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClassSafes = createAsyncThunk(
  "class/getClassSafes",
  async (user, thunkAPI) => {
    try {
      return await classSerivce.getClassSafes(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getClassStudents = createAsyncThunk(
  "class/getClassStudents",
  async ({ user, classId }, thunkAPI) => {
    try {
      return await classSerivce.getClassStudents(user, classId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// The initial state
const initialState = {
  classInfo: [],
  classSafes: [],
  classStudents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    clearClass: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classInfo = action.payload;
      })
      .addCase(getClassInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.className = "";
      })
      .addCase(getClassSafes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassSafes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classSafes = action.payload;
      })
      .addCase(getClassSafes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.classStudents = [];
      })
      .addCase(getClassStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classStudents = [...action.payload];
      })
      .addCase(getClassStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.classStudents = [];
      });
  },
});

export const { clearClass } = classSlice.actions;
export default classSlice.reducer;
