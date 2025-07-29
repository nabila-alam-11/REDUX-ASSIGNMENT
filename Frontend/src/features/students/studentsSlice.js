import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://redux-assignment-rose.vercel.app/students"
    );
    return response.data;
  }
);
export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(
      "https://redux-assignment-rose.vercel.app/students",
      newStudent
    );
    return response.data;
  }
);
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (studentId) => {
    const response = await axios.delete(
      `https://redux-assignment-rose.vercel.app/students/${studentId}`
    );
    return response.data;
  }
);
export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.error = "error";
      state.error = action.payload;
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.students.filter((student) => student._id !== action.payload._id);
    });
    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { setFilter, setSortBy } = studentsSlice.actions;
export default studentsSlice.reducer;
