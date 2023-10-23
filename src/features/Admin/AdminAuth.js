import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const login = createAsyncThunk("Admin/login", async (user) => {
  const res = await axios.post("/admin/signin", user);

  if (res.status === 200) {
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      token: res.data.token,
      user: res.data.user,
      message: res.data.message,
    };
  }
});


export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: "Admin/login/fulfilled",
        payload: { token, user },
      });
    } else {
      dispatch({
        type: "Admin/login/rejected",
        payload: { error: "Failed to login" },
      });
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.authenticating = true;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticating = false;
      state.authenticate = true;
      state.message = null;
    },
    [login.rejected]: (state, action) => {
      state.message = "Check Your Information Again. And Try Again";
      state.loading = false;
      state.authenticating = false;
    }
  },
});

export default authSlice.reducer;
