import axios, { AxiosInstance } from 'axios';

const BASE_URL = ' http://localhost:4000/slate/api';
// /slate/api/auth/refres
// http://localhost:4000
// export default axiosInstance;

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});