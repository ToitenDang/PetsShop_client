
// api/index.js
import axios from 'axios';
import { API_URL } from '~/constants';  // URL API
import configAxios from './config'; // Cấu hình Axios
import RegisterAPI from './register'; // Import Register API
import LoginAPI from './login'; // Import Login API
import UserAPI from './users'; // Import User API
import ProductAPI from './products'; // Import Product API
import ReviewAPI from './reviews'; // Import Review API
import CheckTokenAPI from './checkToken';
import LogoutAPI from './logout';
import CategoryAPI from './category';
import OrderAPI from './order';
import ServiceAPI from './service.js'
import BookingAPI from './booking.js';
import EmailSenderAPI from './email.js';
import PromotionAPI from './promotion';
import ChatAPI from './chat';
import MessageAPI from './message';
import NotifyAPI from './notify';
// Tạo một instance của axios

const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // Thay đổi URL theo backend của bạn
  withCredentials: true, // Để gửi cookie cho yêu cầu làm mới token
});

// Cấu hình axios nếu cần thiết
configAxios(axiosInstance);

// Export các API
export const RegisterFetch = RegisterAPI(axiosInstance);
export const LoginFetch = LoginAPI(axiosInstance);
export const UserFetch = UserAPI(axiosInstance);

export const CheckTokenFetch = CheckTokenAPI(axiosInstance);
export const LogoutFetch = LogoutAPI(axiosInstance);

export const ProductFetch = ProductAPI(axiosInstance);  
export const ReviewFetch = ReviewAPI(axiosInstance);  
export const CategoryFetch = CategoryAPI(axiosInstance);
export const OrderFetch = OrderAPI(axiosInstance)

export const ServiceFetch = ServiceAPI(axiosInstance);
export const BookingFetch = BookingAPI(axiosInstance);
export const EmailSenderFetch = EmailSenderAPI(axiosInstance);
export const PromotionFetch = PromotionAPI(axiosInstance);
export const ChatFetch = ChatAPI(axiosInstance);
export const MessageFetch = MessageAPI(axiosInstance);
export const NotifyFetch = NotifyAPI(axiosInstance);