import { useMutation } from '@tanstack/react-query';
import { updateInterestField } from 'apis/interest';
import AddInterestRequestDto from 'models/field/request/AddInterestRequestDto';
import { ApiErrorResponse } from 'types/ApiResponse';

// eslint-disable-next-line import/prefer-default-export
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
