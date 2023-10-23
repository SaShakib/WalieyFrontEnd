import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getinitial = createAsyncThunk("Initial", async () => {
  const initial = await axios.get("/initialdata");
  return initial.data;
});
 
const homeSlice = createSlice({
  name: "home",
  initialState: {
  },
  reducers: {},
  extraReducers: {
    [getinitial.pending]: (state, action) => {
      state.loading = true;
    },
    [getinitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories
      state.products = action.payload.products
      state.bestseller = action.payload.bestseller

      state.featured = action.payload.featured
      state.shops = action.payload.shops
    },
    [getinitial.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.errors;

    },
  },
});
export default homeSlice.reducer;
