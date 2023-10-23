import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../SuperAdmin/axios";

export const getSuperAdminProduct = createAsyncThunk(
  "superAdmin/products",
  async (page) => {
    const products = await axios.get(`/superAdmin/products?limit=15&page=${page}`);
    return products.data;
  }
);
export const getSuperAdminOrders = createAsyncThunk(
  "superAdmin/orders",
  async () => {
    const products = await axios.get("/superAdmin/orders");
    return products.data;
  }
);

export const getSlider = createAsyncThunk("superAdmin/Slider", async () => {
  const res = await axios.get("/slider");
  return res.data;
});

export const SuperAdminLogin = createAsyncThunk(
  "SuperAdmin/login",
  async (form) => {
    console.log(form, "ok");
    const res = await axios.post("/superAdmin/Login", form);

    if (res.status === 200) {
      localStorage.clear();
      const { token, superAdmin, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("superAdmin", superAdmin);
      localStorage.setItem("role", role);

      return {
        token: res.data.token,
        SuperAdmin: res.data.SuperAdmin,
        role: res.data.role,
      };
    }
  }
);

export const SuperAdminUpdateProduct = createAsyncThunk(
  "superAdmin/UpdateProducts",
  async (form) => {
    const { e, best_seller, featured } = form;
    const update = { best_seller, featured };

    const products = await axios.put(`/superAdmin/products/${e}`, update);
    return products.data;
  }
);

export const SuperAdminDeleteProduct = createAsyncThunk(
  "superAdmin/DeleteProducts",
  async (id) => {
    console.log(id);
    const products = await axios.delete(`/superAdmin/products/${id}`);
    return products.data;
  }
);

export const SuperAdminDeleteCategory = createAsyncThunk(
  "superAdmin/DeleteCategory",
  async (id) => {
    const products = await axios.delete(`/superAdmin/category/${id}`);
    return products.data;
  }
);
export const SuperAdminDeleteColor = createAsyncThunk(
  "superAdmin/DeleteColor",
  async (id) => {
    const products = await axios.delete(`/superAdmin/color/${id}`);
    return products.data;
  }
);

export const SuperAdminDeletesize = createAsyncThunk(
  "superAdmin/Deletesize",
  async (id) => {
    const products = await axios.delete(`/superAdmin/size/${id}`);
    return products.data;
  }
);

export const SuperAdminDeletelocation = createAsyncThunk(
  "superAdmin/Deletelocation",
  async (id) => {
    const products = await axios.delete(`/superAdmin/location/${id}`);
    return products.data;
  }
);
export const SuperAdminDeleteOrder = createAsyncThunk(
  "superAdmin/DeleteOrder",
  async (id) => {
    const products = await axios.delete(`/superAdmin/order/${id}`);
    return products.data;
  }
);

const SuperAdminSlice = createSlice({
  name: "SuperAdmin",
  initialState: {
    products: []
  },
  reducers: {},
  extraReducers: {
    [getSlider.fulfilled]: (state, action) => {
      state.sliders = action.payload.slid;
    },
    [getSuperAdminProduct.pending]: (state, action) => {
      state.loading = true;
    },

    [getSuperAdminProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
    },
    [getSuperAdminProduct.rejected]: (state, action) => {
      state.loading = false;
      state.errors = state.error;
    },
    [SuperAdminLogin.pending]: (state, action) => {
      state.authenticating = true;
    },
    [SuperAdminLogin.fulfilled]: (state, action) => {
      state.authenticating = false;
      state.authenticate = true;
      state.message = "Logged In Succesfully";
    },
    [SuperAdminLogin.rejected]: (state, action) => {
      state.error = "Try Again Later";
    },
    [SuperAdminDeleteColor.fulfilled]: (state, action) => {
      state.message = "Color deleted";
    },
    [getSuperAdminOrders.fulfilled]: (state, action) => {
      state.order = action.payload.success;
    },
  },
});

export default SuperAdminSlice.reducer;
