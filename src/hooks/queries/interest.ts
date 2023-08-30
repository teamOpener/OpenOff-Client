import { useMutation, useQuery } from '@tanstack/react-query';
import { updateInterestField } from 'apis/interest';
import fakeApi from 'apis/test';
import queryKeys from 'constants/queryKeys';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import { InterestInfoResponseDto } from 'models/interest/response/InterestInfoResponseDto';
import { ApiErrorResponse } from 'types/ApiResponse';
import InterestFieldData from 'data/interestFieldData.json';

export const useUpdateInterestField = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: AddInterestRequestDto) => updateInterestField(data),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};

export const useInterestFieldLists = () => {
  return useQuery(
    [...queryKeys.interestKeys.info],
    () =>
      fakeApi<InterestInfoResponseDto[]>(
        InterestFieldData as InterestInfoResponseDto[],
      ),
    {
      select: (data) => data.data,
    },
  );
};
