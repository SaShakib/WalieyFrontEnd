import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getShops = createAsyncThunk("Shops/getProduct", async () => {
  const shops = await axios.get("/shops");
  return shops.data;
});

export const getshopsById = createAsyncThunk("Shops/getById", async (id) => {
  const shops = await axios.get(`/shops/${id}`);
  return shops.data;
});

const shopSlice = createSlice({
  name: "Shops",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getShops.pending]: (state, action) => {
      state.loading = true;
    },
    [getShops.fulfilled]: (state, action) => {
      state.loading = false;
      state.shops = action.payload.shops;
    },
    [getShops.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getshopsById.pending]: (state, action) => {
      state.loading = true;
    },
    [getshopsById.fulfilled]: (state, action) => {
      state.loading = false;
      state.shops = action.payload.admin;
      state.products = action.payload.products
    },
    [getshopsById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default shopSlice.reducer;
