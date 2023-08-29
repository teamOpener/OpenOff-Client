import AsyncStorage from '@react-native-async-storage/async-storage';
import fetcher from 'apis';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';
import ResetPasswordRequestDto from 'models/auth/request/ResetPasswordRequestDto';
import { SocialSignupRequestDto } from 'models/auth/request/SocialSignupRequestDto';
import { TokenRequestDto } from 'models/auth/request/TokenRequestDto';
import { CheckEmailResponseDto } from 'models/auth/response/CheckEmailResponseDto';
import { CheckNicknameResponseDto } from 'models/auth/response/CheckNicknameResponseDto';
import SearchIdResponseDto from 'models/auth/response/SearchIdResponseDto';
import { TokenResponseDto } from 'models/auth/response/TokenResponseDto';
import NCPSmsInfoRequestDto from 'models/user/request/NCPSmsInfoRequestDto';
import UserSmsCheckRequestDto from 'models/user/request/UserSmsCheckRequestDto';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiResponse } from 'types/ApiResponse';
import AsyncAuthorizeStorage from 'types/apps/asyncAuthorizeStorage';

const { token } = useAuthorizeStore.getState();

export const normalLogin = async (
  data: NormalSignInRequestDto,
): Promise<ApiResponse<TokenResponseDto>> => {
  const response = await fetcher.post(`auth/login/normal`, data);
  return response.data;
};

export const normalSignUp = async (
  data: NormalSignInRequestDto,
): Promise<ApiResponse<TokenResponseDto>> => {
  const response = await fetcher.post(`auth/signup/normal`, data);
  return response.data;
};

export const refresh = async (): Promise<ApiResponse<TokenResponseDto>> => {
  const value = await AsyncStorage.getItem('authorize');
  const authorizeStore: AsyncAuthorizeStorage = JSON.parse(value ?? '');
  const params: TokenRequestDto = {
    accessToken: authorizeStore.state.token.accessToken,
    refreshToken: authorizeStore.state.token.refreshToken,
  };
  const response = await fetcher.post(`auth/refresh`, params);
  return response.data;
};

export const socialLogin = async (
  data: SocialSignupRequestDto,
): Promise<ApiResponse<TokenResponseDto>> => {
  const params = {
    token: data.token,
  };
  const response = await fetcher.post(
    `/auth/signup/social/${data.socialType}`,
    params,
  );
  return response.data;
};

export const checkEmail = async (
  email: string,
): Promise<ApiResponse<CheckEmailResponseDto>> => {
  const params = {
    email,
  };
  const response = await fetcher.get(`auth/check/email`, { params });
  return response.data;
};

export const checkNickname = async (
  nickname: string,
): Promise<ApiResponse<CheckNicknameResponseDto>> => {
  const params = {
    nickname,
  };
  const response = await fetcher.get(`auth/check/nickname`, { params });
  return response.data;
};

export const sendAuthSms = async (
  data: NCPSmsInfoRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.post(`auth/sms`, data);
  return response.data;
};

export const checkAuthSms = async (
  data: UserSmsCheckRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch(`auth/sms`, data);
  return response.data;
};

export const searchEmail = async (
  phoneNum: string,
): Promise<ApiResponse<SearchIdResponseDto>> => {
  const params = {
    phoneNum,
  };
  const response = await fetcher.get('/auth/search/id', { params });
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequestDto,
): Promise<ApiResponse> => {
  const response = await fetcher.patch('/auth/reset/password', data);
  return response.data;
};
