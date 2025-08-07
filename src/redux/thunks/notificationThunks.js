import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notificationApi } from '../../api/apiService';

export const fetchUserNotifications = createAsyncThunk(
  'notifications/fetchUserNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getUserNotifications(userId);

      console.log("========--fetchUserNotifications----====",response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);