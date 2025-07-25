import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => localStorage.getItem('authToken');

api.interceptors.request.use(
  config => {
    const token = getToken();

    const skipAuthRoutes = ['/auth/login', '/auth/logout'];
    const shouldSkip = skipAuthRoutes.some(route => config.url?.includes(route));

    if (token && !shouldSkip) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

const userManagement = {
  UserById: (id) => api.get("user", id)
}

const meterManagement = {
  getAllMeters: () => api.get('/meter'),
}
const adminDashboard = {

}
const userDashboard = {
  init: (id) => api.get(`/user/dashboard/init/${id}`),//intital data that have all the dashbaord data.
}
const authApis = {
  login: (credential) => api.post('/auth/login', credential),
  logout: () => api.post('/auth/logout'),
}

const userApi = {
  profile: () => api.get('auth/profile')
}

const meterApi = {
  getMeterById: (id) => api.get(`/meter/${id}`),
  getAllMeter: () => api.get('meter/get-all-meter'),
  addMeter: (data) => api.post('meter/create',data),
  asignMeter: (data) => api.post('meter/assign-meter', data),
  updateMeter: (id) => api.put(`/meter/update/${id}`),
  deleteMeter: (id) => api.delete(`/meter/update/${id}`),
  getAllMeterFromIOT: () => api.get('/meter/get-all-meter-from-iot')
}

export { userManagement, meterManagement, authApis, userDashboard, userApi, meterApi }