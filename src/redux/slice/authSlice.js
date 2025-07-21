// store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authApis } from "../../api/apiService";

// Async login thunk
export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
      const response = await authApis.login(credentials);
      const user = response.data.data;
      
      localStorage.setItem("authToken", JSON.stringify(user.authToken));
      localStorage.setItem("refreshToken",JSON.stringify(user.refreshToken));

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("authToken")),
  loading: false,
  error: null ,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
