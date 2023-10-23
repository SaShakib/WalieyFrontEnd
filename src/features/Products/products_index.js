import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getProduct = createAsyncThunk("Product/getProduct", async (opt) => {
  const products = await axios.get(`/products?page=${opt.page}&limit=${opt.limit}`);
  return products.data;
});
export const getAdminProduct = createAsyncThunk(
  "Product/getAdminProduct",
  async () => {
    const products = await axios.get("/products/admin");
    return products.data;
  }
);
export const UpdateAdminStock = createAsyncThunk(
  "Product/UpdateAdminStock",
  async (form) => {
    const {stock, e} = form
    const products = await axios.put(`/products/stock/${e}`, {stock});
    return products.data;
  }
);



const productSlice = createSlice({
  name: "Product",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.results;
      if(action.payload.next) {
        state.next = action.payload.next
      }
      if(action.payload.previous) {
        state.previous = action.payload.previous
      }
    },
    [getProduct.rejected]: (state, action) => {
      state.message = "Something went wrong";
      state.error = action.error;
      state.loading = false;
    },
    [getAdminProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getAdminProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [getAdminProduct.rejected]: (state, action) => {
      state.message = "Something went wrong";
      state.error = action.error;
      state.loading = false;
    },
    
  },
});

export default productSlice.reducer;
