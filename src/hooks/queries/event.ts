import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import fakeApi from 'apis/test';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import {
  getEventDetailInfo,
  getFieldEventLists,
  getPersonalEventLists,
  getVogueEventLists,
} from 'apis/eventInstance';
import { FieldCode } from 'constants/code';

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

export const useFieldEventLists = (field: FieldCode) => {
  const query = useInfiniteQuery(
    [...queryKeys.eventKeys.listByField(field)],
    ({ pageParam = undefined }) =>
      getFieldEventLists({
        eventInfoId: pageParam,
        field,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastPage.data?.hasNext) {
          return false;
        }
        return lastPage.data?.content[lastIdx - 1].eventInfoId;
      },
      suspense: false,
    },
  );
  return query;
};

export const useVogueEventInfiniteLists = () => {
  return useInfiniteQuery(
    [...queryKeys.eventKeys.vogueInfiniteList],
    ({ pageParam = { count: undefined, eventInfoId: undefined } }) =>
      getVogueEventLists({
        count: pageParam.count,
        eventInfoId: pageParam.eventInfoId,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastPage.data?.hasNext) {
          return false;
        }
        return {
          eventInfoId: lastPage.data?.content[lastIdx - 1].eventInfoId,
          count: lastPage.data?.content[lastIdx - 1].totalApplicantCount,
        };
      },
      suspense: false,
    },
  );
};

export const useVogueEventLists = () => {
  return useQuery(
    [...queryKeys.eventKeys.vogueList],
    () => getVogueEventLists(),
    {
      select: (data) => data.data,
    },
  );
};

export const usePersonalEventLists = () => {
  return useQuery(
    [...queryKeys.eventKeys.personalList],
    () => getPersonalEventLists(),
    {
      select: (data) => data.data,
      suspense: false,
    },
  );
};
