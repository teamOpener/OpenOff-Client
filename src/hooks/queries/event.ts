import { useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import fakeApi from 'apis/test';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import { DetailEventInfoResponseDto } from 'models/event/response/DetailEventInfoResponseDto';
import detailEventInfoData from 'mocks/event/detailEventInfoData.json';

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

// TODO: 이벤트 상세 정보 조회
export const useEventDetail = (id: number) => {
  return useQuery([...queryKeys.eventKeys.byId(id)], () =>
    fakeApi<DetailEventInfoResponseDto>(detailEventInfoData),
  );
};
