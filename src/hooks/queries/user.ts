import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateInterestField } from 'apis/interest';
import {
  checkSms,
  findUserByNickname,
  getMyInfo,
  sendSms,
  updateOnBoarding,
  uploadImage,
  uploadImages,
  uploadProfileImage,
  withdrawal,
} from 'apis/user';
import queryKeys from 'constants/queries/queryKeys';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import NCPSmsInfoRequestDto from 'models/user/request/NCPSmsInfoRequestDto';
import { S3UploadServiceRequestDto } from 'models/user/request/S3UploadServiceRequestDto';
import { SearchNicknameRequestDto } from 'models/user/request/SearchNicknameRequestDto';
import UserOnboardingRequestDto from 'models/user/request/UserOnboardingRequestDto';
import UserProfileUploadRequestDto from 'models/user/request/UserProfileUploadRequestDto';
import UserSmsCheckRequestDto from 'models/user/request/UserSmsCheckRequestDto';
import { removeToken } from 'services/fcm';
import { useAuthorizeStore } from 'stores/Authorize';
import { ApiErrorResponse } from 'types/ApiResponse';

export const useSendSms = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: NCPSmsInfoRequestDto) => sendSms(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useCheckSms = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: UserSmsCheckRequestDto) => checkSms(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

interface ConcludeOnBoardingProps {
  onBoarding: UserOnboardingRequestDto;
  fields: AddInterestRequestDto;
}

export const useConcludeOnBoarding = () => {
  return useMutation(
    async (data: ConcludeOnBoardingProps) => {
      await updateInterestField(data.fields);
      const onboarding = await updateOnBoarding(data.onBoarding);
      return onboarding;
    },
    {
      useErrorBoundary: false,
    },
  );
};

export const useMyInfo = ({ isLogin }: { isLogin?: boolean }) => {
  return useQuery([...queryKeys.userKeys.myInfo], () => getMyInfo(), {
    select: (data) => data.data,
    enabled: !!isLogin,
  });
};

export const useUploadImage = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: S3UploadServiceRequestDto) => uploadImage(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useUploadImages = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: FormData[]) => uploadImages(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
  });
};

export const useUploadProfileImage = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: UserProfileUploadRequestDto) => uploadProfileImage(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useFindUserByNickname = ({
  keyword,
}: SearchNicknameRequestDto) => {
  return useQuery(
    [...queryKeys.userKeys.findUser(keyword)],
    () => findUserByNickname({ keyword }),
    {
      select: (data) => data.data,
      suspense: false,
    },
  );
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetToken, resetFcmToken, setIsLogin } = useAuthorizeStore();

  const logout = async () => {
    resetToken();
    resetFcmToken();
    await removeToken();
    queryClient.clear();
    setIsLogin(false);
  };

  return useMutation(() => logout());
};

export const useWithdrawal = (successCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { resetToken, resetFcmToken, setIsLogin } = useAuthorizeStore();

  const withdrawalAndLogout = async () => {
    await withdrawal();
    resetToken();
    resetFcmToken();
    await removeToken();
    queryClient.clear();
    setIsLogin(false);
  };

  return useMutation(() => withdrawalAndLogout(), {
    onSuccess: successCallback,
  });
};
