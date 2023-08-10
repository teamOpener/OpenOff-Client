import { useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import fakeApi from 'apis/test';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import { getEventDetailInfo } from 'apis/eventInstance';

// TODO: 생성
export const useCreateEvent = (
  successCallback?: () => void,
  errorCallback?: () => void,
) => {
  return useMutation((data: CreateNewEventRequestDto) => fakeApi(), {
    onSuccess: successCallback,
    onError: errorCallback,
  });
};

export const useEventDetail = (eventInfoId: number) => {
  return useQuery(
    [...queryKeys.eventKeys.byId(eventInfoId)],
    () => getEventDetailInfo(eventInfoId),
    {
      select: (data) => data.data,
    },
  );
};

// TODO 신청
export const useApplyEvent = (
  successCallback?: () => void,
  errorCallback?: () => void,
) => {
  // TODO dto 추가
  return useMutation(() => fakeApi(), {
    onSuccess: successCallback,
    onError: errorCallback,
  });
};
