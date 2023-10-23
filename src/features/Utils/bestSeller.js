import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getBest = createAsyncThunk("Product/BestSeller", async () => {
  const products = await axios.get("/best");
  return products.data;
});

const featuredSlice = createSlice({
  name: "BestSeller",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getBest.pending]: (state, action) => {
      state.loading = true;
    },

    [getBest.fulfilled]: (state, action) => {
      state.loading = false;
      state.bestSeller = action.payload.products;
    },
    [getBest.rejected]: (state, action) => {
      state.loading = false;
      state.errors = state.error;
    },
  },
});

export default featuredSlice.reducer;
