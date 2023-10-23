import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getFeatured = createAsyncThunk("Product/featured", async () => {
  const products = await axios.get("/featured");
  return products.data;
});

const featuredSlice = createSlice({
  name: "featured",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getFeatured.pending]: (state, action) => {
      state.loading = true;
    },

    [getFeatured.fulfilled]: (state, action) => {
      state.loading = false;
      state.featured = action.payload.products;
    },
    [getFeatured.rejected]: (state, action) => {
      state.loading = false;
      state.errors = state.error;
    },
  },
});

export default featuredSlice.reducer;
