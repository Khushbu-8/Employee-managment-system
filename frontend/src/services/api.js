import axios from 'axios';

const API = axios.create({
   baseURL: 'https://employee-managment-system-nu-dun.vercel.app',
  //  baseURL: 'http://localhost:4000',
    withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;