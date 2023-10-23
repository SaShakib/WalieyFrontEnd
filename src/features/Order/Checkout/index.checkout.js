import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../app/helpers/axios";

export const CheckoutPost = createAsyncThunk(
  "checkout/create",
  async (form) => {
    console.log(form)
    const CheckoutPost = await axios.post("/checkout", form);
    return CheckoutPost.data;
  }
);



const CheckoutSlice = createSlice({
  name: "checkout",
  initialState: {},
  reducers: {},
  extraReducers: {
    [CheckoutPost.pending]: (state, action) => {
      state.loading = true;
    },
    [CheckoutPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [CheckoutPost.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    
  },
});

export default CheckoutSlice.reducer;
