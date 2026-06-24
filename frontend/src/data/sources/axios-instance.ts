import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://e-mading-backend.vercel.app/api',
  withCredentials: true,
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
});
