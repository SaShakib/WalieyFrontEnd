import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

//done
export const CreateCat = createAsyncThunk("Category/create", async (form) => {
  const cat = await axios.post("/category/create", form);
  return cat.data;
});
//done
export const Categories = createAsyncThunk("Category/all", async () => {
  const cat = await axios.get("/category/all");
  return cat.data;
});

export const TopCategory = createAsyncThunk(
  "Category/TopCategory",
  async () => {
    const cat = await axios.get("/category");
    return cat.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "Category/delete",
  async (id) => {
    const deleteCategory = await axios.delete(`category/${id}`, {
      params: null,
    });
    return deleteCategory.data;
  }
);
//done
export const getBySlug = createAsyncThunk(
  "Category/getBySlug",
  async (slug) => {
    const category = await axios.get(`/category/${slug}`);
    return category.data;
  }
);

export const getByParentId = createAsyncThunk(
  "Category/getByParentId",
  async (id) => {
    const category = await axios.get(`/category/parent/${id}`);
    return category.data;
  }
);

const categorySlice = createSlice({
  name: "Category",
  initialState: {},
  reducers: {},
  extraReducers: {
    [Categories.pending]: (state, action) => {
      state.loading = true;
    },
    [Categories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
    },
    [Categories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [TopCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [TopCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categoryList;
    },
    [TopCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [CreateCat.pending]: (state, action) => {
      state.loading = true;
    },
    [CreateCat.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [CreateCat.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getBySlug.pending]: (state, action) => {
      state.loading = true;
    },
    [getBySlug.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
      state.products = action.payload.products;
    },
    [getBySlug.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.message = "Can not get data from the server";
      state.error = action.error;
    },
    [getByParentId.fulfilled]: (state, action) => {
      state.children = action.payload.children;
      state.products = action.payload.products;
    },
  },
});

export default categorySlice.reducer;
