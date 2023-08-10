import fetcher from 'apis';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';
import { SocialSignupRequestDto } from 'models/auth/request/SocialSignupRequestDto';
import { TokenRequestDto } from 'models/auth/request/TokenRequestDto';
import { CheckEmailResponseDto } from 'models/auth/response/CheckEmailResponseDto';
import { CheckNicknameResponseDto } from 'models/auth/response/CheckNicknameResponseDto';
import { TokenResponseDto } from 'models/auth/response/TokenResponseDto';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiResponse } from 'types/ApiResponse';

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
  const response = await fetcher.post(`/auth/signup/normal`, data);
  return response.data;
};

export const refresh = async (): Promise<ApiResponse<TokenResponseDto>> => {
  const params: TokenRequestDto = {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
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
  const response = await fetcher.get(`/auth/check/email`, { params });
  return response.data;
};

export const checkNickname = async (
  nickname: string,
): Promise<ApiResponse<CheckNicknameResponseDto>> => {
  const params = {
    nickname,
  };
  const response = await fetcher.get(`/auth/check/nickname`, { params });
  return response.data;
};
