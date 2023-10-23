import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const Createlocation = createAsyncThunk(
  "Location/Create",
  async (loc) => {
    
    const location = await axios.post("/location/create", loc);
    return location.data;
  }
);

export const getlocation = createAsyncThunk(
  "location/getlocation",
  async () => {
    const locations = await axios.get("/location");
    return locations.data;
  }
);

export const LocationDeleteById = createAsyncThunk("Location/getById", async (id) => {
  const location = await axios.delete(`/location/${id}`);
  return location.data;
});

export const getByplace = createAsyncThunk(
  "location/getByplace",
  async (place) => {
    const location = await axios.get(`/location/${place}`);
    return location.data;
  }
);


const LocationSlice = createSlice({
  name: "Location",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getlocation.pending]: (state, action) => {
      state.loading = true;
    },
    [getlocation.fulfilled]: (state, action) => {
      state.loading = false
      state.locations = action.payload.location
    },
    [getlocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [Createlocation.pending]: (state, action) => {
      state.loading = true;
    },
    [Createlocation.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [Createlocation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getByplace.pending]: (state, action) => {
      state.loading = true;
    },
    [getByplace.fulfilled]: (state, action) => {
      state.loading = false
      state.shops = action.payload.shops
    },
    [getByplace.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
export default LocationSlice.reducer
