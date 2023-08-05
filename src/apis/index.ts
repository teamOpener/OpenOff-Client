/* eslint-disable no-return-assign */
import axios from 'axios';

const baseURL = 'https://example.com';

const fetcher = axios.create({
  baseURL,
  timeout: 10 * 1000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

fetcher.interceptors.request.use((config) => {
  // TODO 지우기
  return config;
});

fetcher.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const res = error && error.response;
    const apiError = res && res.code;

    if (apiError) {
      // error code로 token error 판별
      // TODO
      /**
        * if (토근 만료 에러) {
            const refreshToken = await AsyncStorage.get();
            if(refreshToken); { // refresh token이 있다면 refresh 시키기
                return;
            }
            // 없다면 logout 시키기 + login 페이지로 이동
            clearToken();
        }
    */
    }
  },
);

export default fetcher;

export const applyToken = (accessToken: string) =>
  (fetcher.defaults.headers.Authorization = `Bearer ${accessToken}`);

export const clearToken = () => (fetcher.defaults.headers.Authorization = null);
