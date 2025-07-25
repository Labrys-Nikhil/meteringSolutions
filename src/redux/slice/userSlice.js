import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (thunkAPI) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.profile;
export const selectUserStatus = (state) => state.user.status;
export default userSlice.reducer;
