// api/index.js
import axios from 'axios';
import { API_URL } from '~/constants';  // URL API
import configAxios from './config'; // Cấu hình Axios
import RegisterAPI from './register'; // Import Register API
import LoginAPI from './login'; // Import Login API
import UserAPI from './users'; // Import User API
import ProductAPI from './products'; // Import Product API
import ReviewAPI from './reviews'; // Import Review API

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // URL backend của bạn
  withCredentials: true, // Gửi cookie cho yêu cầu
});

// Cấu hình axios nếu cần thiết
configAxios(axiosInstance);

// Export các API
export const RegisterFetch = RegisterAPI(axiosInstance);
export const LoginFetch = LoginAPI(axiosInstance);
export const UserFetch = UserAPI(axiosInstance);
export const ProductFetch = ProductAPI(axiosInstance);  
export const ReviewFetch = ReviewAPI(axiosInstance);  
