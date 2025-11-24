import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utility/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    console.log(userData);
    try {
      const res = await axios.post("users/signup", userData, {
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const res = await axios.post("users/signin", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (userData) => {
    try {
      const res = await axios.post("users/forgetpassword", {email: userData}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData) => {
    try {
      const res = await axios.post("users/resetpassword", userData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.user = jwtDecode(action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.user = jwtDecode(action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        // state.isAuthenticated = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        // state.isAuthenticated = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
