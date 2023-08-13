/* eslint-disable no-return-assign */
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiErrorResponse } from 'types/ApiResponse';
import { refresh } from './auth';

const { token, setIsLogin, resetToken, setToken } =
  useAuthorizeStore.getState();

const baseURL = Config.OPENOFF_PROD_SERVER;

const fetcher = axios.create({
  baseURL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// TODO 사용안하면 지우기
fetcher.interceptors.request.use((config) => {
  return config;
});

// TODO 사용안하면 지우기
const onFulfilled = (res: AxiosResponse) => {
  return res;
};

let isTokenRenewalInProgress = false;

const initializeAuthorizeState = (error?: unknown) => {
  resetToken();
  setIsLogin(false);
  fetcher.defaults.headers.Authorization = null;
  isTokenRenewalInProgress = false;
  return Promise.reject(error);
};

const onRejected = async (error: ApiErrorResponse) => {
  const originalRequest = error.config;
  const data = error.response?.data;

  if (
    originalRequest &&
    data &&
    data.code === 601 &&
    !isTokenRenewalInProgress
  ) {
    isTokenRenewalInProgress = true;

    try {
      if (!token.refreshToken) {
        initializeAuthorizeState();
      }

      if (token.refreshToken) {
        const accessToken = await refresh();
        originalRequest.headers.Authorization = `Bearer ${accessToken.data?.accessToken}`;
        setToken({
          accessToken: accessToken.data?.accessToken,
          refreshToken: accessToken.data?.refreshToken,
        });
      }

      const response = await fetcher.request(originalRequest);
      isTokenRenewalInProgress = false;
      return response;
    } catch (refreshError) {
      initializeAuthorizeState(refreshError);
    }
  }
  return Promise.reject(error);
};

fetcher.interceptors.response.use(onFulfilled, onRejected);

export default fetcher;

export const applyToken = (accessToken: string) =>
  (fetcher.defaults.headers.Authorization = `Bearer ${accessToken}`);

export const clearToken = () => (fetcher.defaults.headers.Authorization = null);
