import axios from 'axios';
import configAxios from './config';

import { API_URL } from '~/constants';
import RegisterAPI from './register';
import LoginAPI from './login';
import UserAPI from './users';
import CheckTokenAPI from './checkToken';
import LogoutAPI from './logout';
const axiosInstance = axios.create({
    baseURL: `${API_URL}`, // Thay đổi URL theo backend của bạn
    withCredentials: true, // Để gửi cookie cho yêu cầu làm mới token
  });

configAxios(axiosInstance);
export const RegisterFetch =  RegisterAPI(axiosInstance);
export const LoginFetch = LoginAPI(axiosInstance);
export const UserFetch = UserAPI(axiosInstance);
export const CheckTokenFetch = CheckTokenAPI(axiosInstance);
export const LogoutFetch = LogoutAPI(axiosInstance);