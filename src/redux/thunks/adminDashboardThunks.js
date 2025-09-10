import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminDashboard } from '../../api/apiService';




export const fetchDashboardData = createAsyncThunk(
  'adminDashboard/fetchDashboardData',
  async (adminId, thunkAPI) => {
    try {
      const response = await adminDashboard.getRecentData(adminId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAdminDailyConsumption = createAsyncThunk(
  'adminDashboard/fetchAdminDailyConsumption',
  async (adminId, thunkAPI) => {
    try {
      const response = await adminDashboard.getAdminDailyConsumption(adminId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFilteredChartData = createAsyncThunk(
  'chart/fetchFilteredChartData',
  async ({ adminId, from, to }, thunkAPI) => {
    try {
      const response = await adminDashboard.getFilteredChartData({ adminId, from, to });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const fetchAdminUserMeterData = createAsyncThunk(
//   'adminDashboard/fetchAdminUserMeterData',
//   async (adminId, thunkAPI) => {
//     try {
//       const response = await adminDashboard.getAdminUserMeterData(adminId);
//       console.log("------response------",response)
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const fetchAdminUserMeterData = createAsyncThunk(
  'adminDashboard/fetchAdminUserMeterData',
  async ({ adminId, startDate, endDate }, thunkAPI) => {
    try {
      const response = await adminDashboard.getAdminUserMeterData(adminId, startDate, endDate);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMeterListByAdmin = createAsyncThunk(
  'adminDashboard/fetchMeterListByAdmin',
  async (adminId, thunkAPI) => {
    try {
      const response = await adminDashboard.getMeterListByAdmin(adminId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const getTemperedMeter= createAsyncThunk(
  'adminDashboard/getTemperedMeter',
  async (adminId, thunkAPI) => {
    try {
      const response = await adminDashboard.getTemperedMeter(adminId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);




export const fetchOfflineOnlineFaultyMeter = createAsyncThunk(
  "adminDashboard/getofflineOnlineFaultyMeter",
  async ({ adminId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await adminDashboard.getofflineOnlineFaultyMeter(adminId, page, limit);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);