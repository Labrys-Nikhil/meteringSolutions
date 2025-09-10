import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Function to handle unauthorized access
const handleUnauthorized = () => {
  // Clear stored authentication data
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  
  // // Show notification
  // toast.error("Session expired. Please login again.");
  
  // Redirect to login page
  window.location.href = "/";
};


const getToken = () => localStorage.getItem("authToken");

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    const skipAuthRoutes = ["/auth/login", "/auth/logout"];
    const shouldSkip = skipAuthRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (token && !shouldSkip) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);
const userManagement = {
  UserById: (id) => api.get("user", id),
  getUsersByQuery: ({ superAdminId, adminId, role, search }) =>
    api.get("/user/users", {
      params: {
        superAdminId,
        adminId,
        role,
        search,
      },
    }),

  updateUserById: (id, data) => api.patch(`/user/update-user/${id}`, data),
  createUser: (data) => api.post("/user/create-user", data),
  deleteUserById: (id) => api.delete(`/user/delete-user/${id}`),
};

const meterManagement = {
  getAllMeters: () => api.get("/meter"),
};

// const userDashboard = {
//   init: (id) => api.get(`/user/dashboard/init/${id}`),//intital data that have all the dashbaord data.

// }

const userDashboard = {
  init: (id, startDate, endDate) =>
    api.get(
      `/user/dashboard/init/${id}?startDate=${startDate}&endDate=${endDate}`
    ),
};
// const userDashboard = {
//   init: (id, range) => api.get(`/user/dashboard/init/${id}?range=${range}`),
// }
const authApis = {
  login: (credential) => api.post("/auth/login", credential),
  logout: () => api.post("/auth/logout"),
};

const userApi = {
  profile: () => api.get(`/user/profile`),
  updateProfile: (data) => api.put("/user/update-profile", data),
};

const meterApi = {
  getMeterById: (id) => api.get(`/meter/${id}`),
  getAllMeter: () => api.get("meter/get-all-meter"),
  addMeter: (data) => api.post("meter/create", data),
  asignMeter: (data) => api.post("meter/assign-meter", data),
  updateMeter: (id) => api.put(`/meter/update/${id}`),
  deleteMeter: (id) => api.delete(`/meter/update/${id}`),
  getAllMeterFromIOT: () => api.get("/meter/get-all-meter-from-iot"),
  getMeterByMeterId: (meterId, params = {}) =>
    api.get(`/meter/by-meterId/${meterId}`, { params }),
  getAllMeterWithPayment: () => api.get(`meter/get-all-meter-with-payment`),
  getMeterDataDaily: () => api.get("meter/get-meterdata-daily"),
  getMeterData30Days: () => api.get("meter/get-meterdata-30days"),
  sendDownlink: (payload, port) =>
    api.post("meter/send-downlink-command-iot", { payload, port }),
};

export const adminDashboard = {
  getRecentData: (adminId) =>
    api.get(`user/adminDashboard/recent-data/${adminId}`),
  getAdminDailyConsumption: (adminId) =>
    api.get(`user/adminDashboard/get-admin-daily-consumption/${adminId}`),
  getFilteredChartData: ({ adminId, from, to }) => {
    const params = {};
    if (from && to) {
      params.from = from;
      params.to = to;
    }
    return api.get(
      `user/adminDashboard/get-admin-daily-consumption/${adminId}`,
      { params }
    );
  },

    getTemperedMeter: (adminId) =>
    api.get(`user/adminDashboard/get-tempered-meters/${adminId}`),
  // getAdminUserMeterData: (adminId) => api.get(`user/adminDashboard/get-userdata-by-admin/${adminId}`),
  getAdminUserMeterData: (adminId, startDate, endDate) =>
    api.get(`user/adminDashboard/get-userdata-by-admin/${adminId}`, {
      params: { startDate, endDate },
    }),

  getMeterListByAdmin: (adminId) =>
    api.get(`user/adminDashboard/get-meter-by-admin/${adminId}`),
  getDueBalanceUser: (adminId) => api.get(`user/negative-payments/${adminId}`),

  getofflineOnlineFaultyMeter: (adminId, page = 1, limit = 10) =>
    api.get(`user/adminDashboard/get-latest-offline-online-faulty/${adminId}`, {
      params: { page, limit },
    }),
};

const paymentApi = {
  getPaymentHistoryById: (meterId, params = {}) =>
    api.get(`user/get-payment-history-by/${meterId}`, { params }),
};

const notificationApi = {
  getUserNotifications: (userId) => api.get(`/notifications/user/${userId}`), //
  getAdminNotifications: (adminId) =>
    api.get(`/notifications/admin/${adminId}`),
  toggleNotificationStatus: ({ userId, status }) =>
    api.patch(`/notifications/status/${userId}`, { status }),
};

// In your api.js file, update the alertApi methods if needed
const alertApi = {
  createAlert: (alertData) => api.post(`/alert`, alertData),
  getAlerts: (params = {}) => api.get(`/alert`, { params }),
  getAlert: (id) => api.get(`/alert/${id}`),
  updateAlert: (id, updateData) => api.patch(`/alert/${id}`, updateData),
  deleteAlert: (id) => api.delete(`/alert/${id}`),
  getAvailableMeters: (excludeSystemAlerts = false) =>
    api.get(`/alert/available-meters`, {
      params: { excludeSystemAlerts },
    }),
};

const ticketApi = {
  create: (data) => api.post("/ticket/create", data),
  getAll: () => api.get("/ticket"), //for the superAdmin
  getById: (id) => api.get(`/ticket/${id}`),
  getByAdminId: (adminId) => api.get(`/ticket/admin/${adminId}`),
  getByUserId: (userId) => api.get(`/ticket/user/${userId}`),
  getByMeterId: (meterId) => api.get(`/ticket/meter/${meterId}`),
  addComment: (id, data) => api.post(`/ticket/${id}/comment`, data),
  changeStatus: (id, status, notes) =>
    api.patch(`/ticket/${id}/status`, { status, notes }),
  escalate: (id) => api.patch(`/ticket/${id}/escalate`),
  clearEscalation: (id) => api.patch(`/ticket/${id}/clear-escalation`),
  reopen: (id) => api.patch(`/ticket/${id}/reopen`),
  closeTicket: (id) => api.patch(`/ticket/${id}/close`),
  changePriority: (id, notes, priority) =>
    api.patch(`/ticket/${id}/change-priority`, { priority, notes }),
};

const roleApi = {
  getAllRoles: () => api.get("/roles/get-all-roles"),
  getPermissionsByRole: (roleName) =>
    api.get(`/roles/get-permissions-by-role/${roleName}`),
  updatePermissionsInBulk: (payload) =>
    api.post(`/roles/update-permissions-in-bulk/`, payload),
  getViewPermissionsByRole: () =>
    api.get(`/roles/get-view-permissions-by-role`),
};

export {
  userManagement,
  meterManagement,
  authApis,
  userDashboard,
  userApi,
  meterApi,
  paymentApi,
  notificationApi,
  alertApi,
  ticketApi,
  roleApi,
};
