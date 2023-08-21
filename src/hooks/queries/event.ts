import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  createEvent,
  getEventDetailInfo,
  getEventMapInstance,
  getFieldEventLists,
  getPersonalEventLists,
  getVogueEventLists,
  suspensionEvent,
} from 'apis/eventInstance';
import { FieldCode } from 'constants/code';
import queryKeys from 'constants/queryKeys';
import { CreateNewEventRequestDto } from 'models/event/request/CreateNewEventRequestDto';
import EventSearchRequestDto from 'models/event/request/EventSearchRequestDto';
import { EventSuspensionRequestDto } from 'models/event/request/EventSuspensionRequestDto';
import { ApiErrorResponse } from 'types/ApiResponse';

export const useCreateEvent = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation((data: CreateNewEventRequestDto) => createEvent(data), {
    onSuccess: successCallback,
    onError: errorCallback,
    useErrorBoundary: false,
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
      suspense: false,
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

export const useEventMapInstance = (params: EventSearchRequestDto) => {
  return useQuery(
    [...queryKeys.eventKeys.mapList],
    () => getEventMapInstance(params),
    {
      select: (data) => data.data,
      suspense: false,
    },
  );
};

export const useSuspensionEvent = (
  successCallback?: () => void,
  errorCallback?: (error: ApiErrorResponse) => void,
) => {
  return useMutation(
    (data: EventSuspensionRequestDto) =>
      suspensionEvent({ eventInfoId: data.eventInfoId }),
    {
      onSuccess: successCallback,
      onError: errorCallback,
      useErrorBoundary: false,
    },
  );
};
