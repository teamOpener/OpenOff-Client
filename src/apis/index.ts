/* eslint-disable no-return-assign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiErrorResponse } from 'types/ApiResponse';
import AsyncAuthorizeStorage from 'types/apps/asyncAuthorizeStorage';
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
fetcher.interceptors.request.use(async (config) => {
  const value = await AsyncStorage.getItem('authorize');
  const authorizeStore: AsyncAuthorizeStorage = JSON.parse(value ?? '');
  if (authorizeStore.state.token.refreshToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${authorizeStore.state.token.accessToken}`;
  }
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
    !originalRequest ||
    !((data && data.code === 601) || error.response?.status === 403) ||
    isTokenRenewalInProgress
  ) {
    return Promise.reject(error);
  }

  isTokenRenewalInProgress = true;
  try {
    const value = await AsyncStorage.getItem('authorize');
    const authorizeStore: AsyncAuthorizeStorage = JSON.parse(value ?? '');

    if (!authorizeStore.state.token.refreshToken) {
      initializeAuthorizeState();
    }

    if (authorizeStore.state.token.refreshToken) {
      const accessToken = await refresh();
      originalRequest.headers.Authorization = `Bearer ${accessToken.data?.accessToken}`;
      setToken({
        accessToken: accessToken.data?.accessToken,
        refreshToken: accessToken.data?.refreshToken,
      });
      const response = await fetcher.request(originalRequest);
      return response;
    }

    isTokenRenewalInProgress = false;
  } catch (refreshError) {
    initializeAuthorizeState(refreshError);
  }
  return Promise.reject(error);
};

fetcher.interceptors.response.use(onFulfilled, onRejected);

export default fetcher;

export const clearToken = () => (fetcher.defaults.headers.Authorization = null);
