import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const getProductById = createAsyncThunk(
  "SingleProduct/getById",
  async (id) => {
    const products = await axios.get(`/products/${id}`);
    return products.data;
  }
);
export const createProduct = createAsyncThunk(
  "Product/create",
  async (form) => {
    const create = await axios.post("products/create", form);
    return create.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async (id) => {
    const deleteProduct = await axios.delete(`products/${id}`);
    return deleteProduct.data;
  }
);
export const UpdateAdminProduct = createAsyncThunk(
  "Product/UpdateAdminProduct",
  async (form) => {
    const { id } = form;
    console.log(form);
    const products = await axios.put(`/products/update/${id}`, form);
    return products.data;
  }
);

const SingleProduct = createSlice({
  name: "SingleProduct",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getProductById.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.similar = action.payload.Similar;
    },
    [getProductById.rejected]: (state, action) => {
      state.message = "Something went wrong";
      state.error = action.error;
      state.loading = false;
    },
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.message = "Something went wrong";
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [UpdateAdminProduct.fulfilled]: (state, action) => {
      state.message = "Product Update Successfully";
    },
  },
});
export default SingleProduct.reducer;
