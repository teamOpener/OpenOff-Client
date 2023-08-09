import { useMutation } from '@tanstack/react-query';
import { updateInterestField } from 'apis/field';
import { checkSms, sendSms, updateOnBoarding } from 'apis/user';
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
    (data: ConcludeOnBoardingProps) =>
      updateInterestField(data.fields).then(() => {
        updateOnBoarding(data.onBoarding);
      }),
    {
      useErrorBoundary: false,
    },
  );
};
