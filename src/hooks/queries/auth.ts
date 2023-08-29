import { useMutation } from '@tanstack/react-query';
import {
  checkAuthSms,
  checkEmail,
  checkNickname,
  normalLogin,
  normalSignUp,
  resetPassword,
  searchEmail,
  sendAuthSms,
  socialLogin,
} from 'apis/auth';
import { getMyInfo } from 'apis/user';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';
import ResetPasswordRequestDto from 'models/auth/request/ResetPasswordRequestDto';
import { SocialSignupRequestDto } from 'models/auth/request/SocialSignupRequestDto';
import NCPSmsInfoRequestDto from 'models/user/request/NCPSmsInfoRequestDto';
import UserSmsCheckRequestDto from 'models/user/request/UserSmsCheckRequestDto';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiErrorResponse } from 'types/ApiResponse';

const { setToken } = useAuthorizeStore.getState();

export const useNormalLogin = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    async (data: NormalSignInRequestDto) => {
      const normalToken = await normalLogin(data);
      setToken({
        accessToken: normalToken.data?.accessToken,
        refreshToken: normalToken.data?.refreshToken,
      });
      const myInfo = await getMyInfo();
      return myInfo;
    },
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useSocialLogin = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    async (data: SocialSignupRequestDto) => {
      const normalToken = await socialLogin(data);
      setToken({
        accessToken: normalToken.data?.accessToken,
        refreshToken: normalToken.data?.refreshToken,
      });
      const myInfo = await getMyInfo();
      return myInfo;
    },
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useEmailCheck = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((email: string) => checkEmail(email), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useNormalSignUp = (
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: NormalSignInRequestDto) => normalSignUp(data), {
    onSuccess: (data) => {
      setToken({
        accessToken: data.data?.accessToken,
        refreshToken: data.data?.refreshToken,
      });
    },
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useNicknameCheck = (
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((nickname: string) => checkNickname(nickname), {
    onError: errorCallback,
  });
};

export const useSendAuthSms = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: NCPSmsInfoRequestDto) => sendAuthSms(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useCheckAuthSms = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    async (data: UserSmsCheckRequestDto) => {
      await checkAuthSms(data);
      const emailInfo = await searchEmail(data.phoneNum);
      return emailInfo;
    },
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useResetPassword = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: ResetPasswordRequestDto) => resetPassword(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
