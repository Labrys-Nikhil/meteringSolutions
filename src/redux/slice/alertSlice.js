import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { alertApi } from '../../api/apiService';

import { fetchAlerts,createAlert,updateAlert,deleteAlert,toggleAlertStatus,fetchAvailableMeters } from '../thunks/alertThunk';


// // In your alertSlice.js
// export const fetchAlerts = createAsyncThunk(
//   'alerts/fetchAlerts',
//   async (params, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const { role, id: userId } = state.auth.user;
      
//       let queryParams = { ...params };
      
//       // Add meterId to query if provided (for user-specific alerts)
//       if (params.meterId) {
//         queryParams.meterId = params.meterId;
//       }
      
//       const response = await alertApi.getAlerts(queryParams);
//       console.log("=======alerts====",response)
//       return response.data.alerts;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const createAlert = createAsyncThunk(
//   'alerts/createAlert',
//   async (alertData, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const { role, id: userId } = state.auth.user;
      
//       // Add user role information to the alert data
//       const alertDataWithRole = {
//         ...alertData,
//         // The backend will handle the role-based logic
//       };
      
//       const response = await alertApi.createAlert(alertDataWithRole);
//       console.log("===create=======",response.data.alert)
//       return response.data.alert;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateAlert = createAsyncThunk(
//   'alerts/updateAlert',
//   async ({ id, updateData }, { rejectWithValue }) => {
//     try {
//       const response = await alertApi.updateAlert(id, updateData);
//       console.log("=====updaed----",response.data.alert)
//       return response.data.alert;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteAlert = createAsyncThunk(
//   'alerts/deleteAlert',
//   async (id, { rejectWithValue }) => {
//     try {
//       let dletedata= await alertApi.deleteAlert(id);
//       console.log("=====delete",dletedata)
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const toggleAlertStatus = createAsyncThunk(
//   'alerts/toggleStatus',
//   async ({ id, isActive }, { rejectWithValue }) => {
//     try {
//       const response = await alertApi.updateAlert(id, { isActive: !isActive });
//       return response.data.alert;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const fetchAvailableMeters = createAsyncThunk(
//   'alerts/fetchAvailableMeters',
//   async (excludeSystemAlerts, { rejectWithValue }) => {
//     try {
//       const response = await alertApi.getAvailableMeters(excludeSystemAlerts);
//       console.log("=====meters=====",response)
//       return response.data.meters;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Slice
const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
    availableMeters: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAlertError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Alerts
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch alerts';
      })
      
      // Create Alert
      // .addCase(createAlert.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createAlert.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.alerts.push(action.payload);
      // })
      // .addCase(createAlert.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload?.message || 'Failed to create alert';
      // })



      .addCase(createAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts.push(action.payload);
        state.error = null;
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // This should be the error message string
      })
      
      // Update Alert
      .addCase(updateAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAlert.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.alerts.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.alerts[index] = action.payload;
        }
      })
      .addCase(updateAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update alert';
      })
      
      // Delete Alert
      .addCase(deleteAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = state.alerts.filter(a => a._id !== action.payload);
      })
      .addCase(deleteAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete alert';
      })
      
      // Toggle Status
      .addCase(toggleAlertStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAlertStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.alerts.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.alerts[index] = action.payload;
        }
      })
      .addCase(toggleAlertStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to toggle alert status';
      })
      
      // Available Meters
      .addCase(fetchAvailableMeters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableMeters.fulfilled, (state, action) => {
        state.loading = false;
        state.availableMeters = action.payload;
      })
      .addCase(fetchAvailableMeters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch available meters';
      });
  },
});

export const { clearAlertError } = alertSlice.actions;
export default alertSlice.reducer;