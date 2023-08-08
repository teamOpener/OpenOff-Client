/* eslint-disable no-return-assign */
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { ApiErrorResponse } from 'types/ApiResponse';

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
      // 1. refresh token 가져오기
      // 1-1. refresh token이 없다면, 로그아웃
      // 1-2. refresh token이 있다면 refresh
      // const accessToken = await refresh();

      // 2. 새로 받아온 access token으로 재시도
      // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      const response = await fetcher.request(originalRequest);
      isTokenRenewalInProgress = false;
      return response;
    } catch (refreshError) {
      console.log(refreshError);
      // 로그아웃
      isTokenRenewalInProgress = false;
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
};

fetcher.interceptors.response.use(onFulfilled, onRejected);

export default fetcher;

export const applyToken = (accessToken: string) =>
  (fetcher.defaults.headers.Authorization = `Bearer ${accessToken}`);

export const clearToken = () => (fetcher.defaults.headers.Authorization = null);
