// In your alertSlice.js
import { alertApi } from '../../api/apiService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async (params, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { role, id: userId } = state.auth.user;
      
      let queryParams = { ...params };
      
      // Add meterId to query if provided (for user-specific alerts)
      if (params.meterId) {
        queryParams.meterId = params.meterId;
      }
      
      const response = await alertApi.getAlerts(queryParams);
      console.log("=======alerts====",response)
      return response.data.alerts;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAlert = createAsyncThunk(
  'alerts/createAlert',
  async (alertData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { role, id: userId } = state.auth.user;
      
      // Add user role information to the alert data
      const alertDataWithRole = {
        ...alertData,
        // The backend will handle the role-based logic
      };
      
      const response = await alertApi.createAlert(alertDataWithRole);
      console.log("===create=======",response.data.alert)
      return response.data.alert;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAlert = createAsyncThunk(
  'alerts/updateAlert',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await alertApi.updateAlert(id, updateData);
      console.log("=====updaed----",response.data.alert)
      return response.data.alert;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAlert = createAsyncThunk(
  'alerts/deleteAlert',
  async (id, { rejectWithValue }) => {
    try {
      let dletedata= await alertApi.deleteAlert(id);
      console.log("=====delete",dletedata)
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleAlertStatus = createAsyncThunk(
  'alerts/toggleStatus',
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const response = await alertApi.updateAlert(id, { isActive: !isActive });
      return response.data.alert;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAvailableMeters = createAsyncThunk(
  'alerts/fetchAvailableMeters',
  async (excludeSystemAlerts, { rejectWithValue }) => {
    try {
      const response = await alertApi.getAvailableMeters(excludeSystemAlerts);
      console.log("=====meters=====",response)
      return response.data.meters;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);