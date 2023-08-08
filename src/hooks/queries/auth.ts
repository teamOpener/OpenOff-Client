import { ApiErrorResponse } from 'types/ApiResponse';
import { useMutation } from '@tanstack/react-query';
import { normalLogin } from 'apis/auth';
import { NormalSignInRequestDto } from 'models/auth/request/NormalSignInRequestDto';

// eslint-disable-next-line import/prefer-default-export
export const useNormalLogin = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: NormalSignInRequestDto) => normalLogin(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};
