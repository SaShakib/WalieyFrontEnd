import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";
//dispatch signup with user data

export const Signup = createAsyncThunk("Admin/Signup", async (form) => {

  const response = await axios.post(`/admin/signup`, form);
  return response;
});

const userSlice = createSlice({
  name: "Admin",
  initialState: {},
  reducers: {},
  extraReducers: {
    [Signup.pending]: (state) => {
      state.loading = true;
    },
    [Signup.fulfilled]: (state) => {
      state.loading = false;
      state.message = 'Created Successfully';
    },
    [Signup.rejected]: (state) => {
      state.loading = false;
      state.error = 'Error';
    },
  },
});

export default userSlice.reducer;
