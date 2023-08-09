import { useMutation } from '@tanstack/react-query';
import { applyToken } from 'apis';
import { checkEmail, normalLogin, normalSignUp, socialLogin } from 'apis/auth';
import { getMyInfo } from 'apis/user';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';
import { SocialSignupRequestDto } from 'models/auth/request/SocialSignupRequestDto';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiErrorResponse } from 'types/ApiResponse';

const { setToken } = useAuthorizeStore.getState();

export const useNormalLogin = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: NormalSignInRequestDto) =>
      normalLogin(data).then((socialToken) => {
        setToken({
          accessToken: socialToken.data?.accessToken,
          refreshToken: socialToken.data?.refreshToken,
        });
        applyToken(socialToken.data?.accessToken ?? '');
        return getMyInfo();
      }),
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
    (data: SocialSignupRequestDto) =>
      socialLogin(data).then((socialToken) => {
        setToken({
          accessToken: socialToken.data?.accessToken,
          refreshToken: socialToken.data?.refreshToken,
        });
        applyToken(socialToken.data?.accessToken ?? '');
        return getMyInfo();
      }),
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
      applyToken(data.data?.accessToken ?? '');
      setToken({
        accessToken: data.data?.accessToken,
        refreshToken: data.data?.refreshToken,
      });
    },
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
