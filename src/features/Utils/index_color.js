import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const CreateColor = createAsyncThunk("Color/Create", async (color) => {

  const products = await axios.post("/colors/create", color);
  return products.data;
});


export const getColor = createAsyncThunk("Color/getColor", async () => {
  const colors = await axios.get("/colors");
  return colors.data;
});

export const ColorById = createAsyncThunk("Color/getById", async (id) => {
  const colors = await axios.delete(`/colors/${id}`);
  return colors.data;
});



const colorSlice = createSlice({
  name: "Colors",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getColor.pending]: (state, action) => {
      state.loading = true;
    },
    [getColor.fulfilled]: (state, action) => {
      state.loading = false;
      state.colors = action.payload.colors;
    },
    [getColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [CreateColor.pending]: (state, action) => {
      state.loading = true;
    },
    [CreateColor.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [CreateColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export default colorSlice.reducer;
