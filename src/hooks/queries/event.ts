/* eslint-disable import/prefer-default-export */
import { useMutation } from '@tanstack/react-query';
import fakeApi from 'apis/test';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';

// TODO
export const useCreateEvent = (
  successCallback?: () => void,
  errorCallback?: () => void,
) => {
  return useMutation((data: CreateNewEventRequestDto) => fakeApi(), {
    onSuccess: successCallback,
    onError: errorCallback,
  });
};
