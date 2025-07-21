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
    if (token) config.headers.Authorization = `Bearer ${token}`;
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
  UserById : (id)=> api.get("user",id)
}

const meterManagement = {
  getAllMeters: () => api.get('/meter'),
}
const adminDashboard = {

}
const userDashboard = {
  init:(id) => api.get(`/user/dashboard/init/${id}`),//intital data that have all the dashbaord data.
}
const authApis={
  login:(credential) =>api.post('/auth/login',credential),
  logout:() => api.post('/auth/logout'),
}

export {userManagement, meterManagement,authApis,userDashboard}