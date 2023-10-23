import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const CreateSize = createAsyncThunk("Size/Create", async (color) => {
  const size = await axios.post("/size/create", color);
  return size.data;
});

export const getSize = createAsyncThunk("Size/getSize", async () => {
  const size = await axios.get("/size");
  return size.data;
});

export const SizeById = createAsyncThunk("size/getById", async (id) => {
  const size = await axios.delete(`/size/${id}`);
  return size.data;
});

const SizeSlice = createSlice({
  name: "Size",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getSize.pending]: (state, action) => {
      state.loading = true;
    },
    [getSize.fulfilled]: (state, action) => {
      state.loading = false;
      state.sizes = action.payload.size;
    },
    [getSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [CreateSize.pending]: (state, action) => {
      state.loading = true;
    },
    [CreateSize.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [CreateSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export default SizeSlice.reducer;
