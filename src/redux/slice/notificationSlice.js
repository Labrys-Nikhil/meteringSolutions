import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import {
  // fetchAdminNotifications,
  // fetchSystemNotifications,
  fetchUserNotifications,
  // toggleNotificationStatus,
} from "../thunks/notificationThunks";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    userNotifications: [], // <-- Add this line
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch User Notifications
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;

        if (response.success && response.data) {
          // Extract userNotification array from data
          state.userNotifications = response.data.userNotification || [];
        } else {
          state.userNotifications = [];
          state.error = response.message || "No notifications found";
        }
      })

      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch user notifications";
      });
  },
});

// Selectors
const selectNotificationState = (state) => state.notifications;

export const UserNotifications = createSelector(
  [selectNotificationState],
  (notificationsState) => notificationsState.userNotifications
);

// export const {
//   setSearchTerm,
//   setCurrentPage,
//   setActiveTab,
//   selectUser,
//   clearSelectedUser,
// } = notificationSlice.actions;

export default notificationSlice.reducer;
