import { useMutation, useQuery } from '@tanstack/react-query';
import { updateInterestField } from 'apis/interest';
import { checkSms, getMyInfo, sendSms, updateOnBoarding } from 'apis/user';
import queryKeys from 'constants/queryKeys';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import NCPSmsInfoRequestDto from 'models/user/request/NCPSmsInfoRequestDto';
import UserOnboardingRequestDto from 'models/user/request/UserOnboardingRequestDto';
import UserSmsCheckRequestDto from 'models/user/request/UserSmsCheckRequestDto';
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

export const useMyInfo = () => {
  return useQuery([...queryKeys.userKeys.myInfo], () => getMyInfo(), {
    select: (data) => data.data,
  });
};
